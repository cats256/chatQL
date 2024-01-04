import { GraphQLError } from "graphql";
import { ConversationPopulated, GraphQLContext } from "../../util/types";
import { ApolloError } from "apollo-server-core";
import { Prisma } from "@prisma/client";

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
                throw new ApolloError("Not authorized.");
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
                throw new ApolloError(error?.message);
            }
        },
    },
    Mutation: {
        createConversation: async (_: any, args: { participantIds: Array<string> }, context: GraphQLContext): Promise<{ conversationId: string }> => {
            const { session, prisma } = context;
            const { participantIds } = args;

            if (!session?.user) {
                throw new ApolloError("Not authorized.");
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

                return {
                    conversationId: conversation.id,
                };
            } catch (error) {
                console.error("createConversation error", error);
                throw new GraphQLError("Error creating conversation");
            }
        },
    },
};

export default resolvers;
