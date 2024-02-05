import { GraphQLError } from "graphql";
import { ConversationPopulated, GraphQLContext } from "../../util/types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { stringify } from "querystring";

export const participantPopulated = Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
        select: {
            id: true,
            username: true,
        },
    },
});

export const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
        include: participantPopulated,
    },
    latestMessage: {
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    },
});

const resolvers = {
    Query: {
        conversations: async (_: any, __: any, context: GraphQLContext): Promise<Array<ConversationPopulated>> => {
            const { session, prisma } = context;

            if (!session?.user) {
                throw new GraphQLError("Not authorized.");
            }

            const {
                user: { id: userId },
            } = session;

            try {
                return await prisma.conversation.findMany({
                    where: {
                        participants: {
                            some: {
                                userId: {
                                    equals: userId,
                                },
                            },
                        },
                    },
                    include: conversationPopulated,
                });
            } catch (error: any) {
                console.error("conversations error", error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    Mutation: {
        createConversation: async (_: any, args: { participantIds: Array<string> }, context: GraphQLContext): Promise<{ conversationId: string }> => {
            const { session, prisma, pubsub } = context;
            const { participantIds } = args;

            if (!session?.user) {
                throw new GraphQLError("Not authorized.");
            }

            const {
                user: { id: userId },
            } = session;

            try {
                const conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            createMany: {
                                data: participantIds.map((participantId) => ({
                                    userId: participantId,
                                    hasSeenLatestMessage: participantId === userId,
                                })),
                            },
                        },
                    },
                    include: conversationPopulated,
                });

                console.log(conversation);

                pubsub.publish("CONVERSATION_CREATED", {
                    conversationCreated: conversation,
                });

                return {
                    conversationId: conversation.id,
                };
            } catch (error) {
                console.error("createConversation error", error);
                throw new GraphQLError("Error creating conversation");
            }
        },
        markConversationAsRead: async function (_: any, args: { userId: string; conversationId: string }, context: GraphQLContext): Promise<boolean> {
            const { session, prisma } = context;
            const { userId, conversationId } = args;

            if (!session?.user) {
                throw new GraphQLError("Not authorized");
            }

            try {
                const participant = await prisma.conversationParticipant.findFirst({
                    where: {
                        userId,
                        conversationId,
                    },
                });

                if (!participant) {
                    throw new GraphQLError("Participant entity not found");
                }

                await prisma.conversationParticipant.update({
                    where: {
                        id: participant.id,
                    },
                    data: {
                        hasSeenLatestMessage: true,
                    },
                });

                return true;
            } catch (error: any) {
                console.log("markConversationAsRead error", error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    Subscription: {
        conversationCreated: {
            subscribe: withFilter(
                (_: any, __: any, context: GraphQLContext) => {
                    const { pubsub } = context;

                    return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
                },
                (payload, _, context: GraphQLContext) => {
                    const { session } = context;
                    const {
                        conversationCreated: { participants },
                    } = payload;

                    const userIsParticipant = !!participants.find((participant: any) => participant.user.id === session?.user?.id);

                    return userIsParticipant;
                }
            ),
        },
    },
};

export interface ConversationCreatedSubscriptionPayload {
    conversationCreated: ConversationPopulated;
}

export default resolvers;
