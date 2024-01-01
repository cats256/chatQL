import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../util/types";
import { User } from "@prisma/client";

const resolvers = {
    Query: {
        searchUsers: async (_: any, args: { username: string }, context: GraphQLContext): Promise<Array<User>> => {
            const { username: searchedUsername } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                throw new ApolloError("Not authorized");
            }

            const {
                user: { username: currentUsername },
            } = session;

            try {
                const users = await prisma.user.findMany({
                    where: {
                        username: {
                            contains: searchedUsername,
                            not: currentUsername,
                            mode: "insensitive",
                        },
                    },
                });

                return users;
            } catch (error: any) {
                console.error("searchUsers error", error);
                throw new ApolloError(error?.message);
            }
        },
    },
    Mutation: {
        createUsername: async (_: any, args: { username: string }, context: GraphQLContext) => {
            const { username } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                return {
                    error: "Not authorized",
                };
            }

            const { id: userId } = session.user;

            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        username,
                    },
                });

                if (existingUser) {
                    return {
                        error: "Username already taken",
                    };
                }

                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        username,
                    },
                });

                return { success: true };
            } catch (error) {
                return {
                    error: "Something went wrong",
                };
            }
        },
    },
};

export default resolvers;
