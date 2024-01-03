import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";
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
    Mutation: {
        createConversation: async (
            _: any,
            args: { participantsIds: Array<string> },
            context: GraphQLContext
        ): Promise<{ conversationId: string }> => {
            const { session, prisma } = context;
            const { participantsIds } = args;

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
                                data: participantsIds.map((participantId) => ({
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
