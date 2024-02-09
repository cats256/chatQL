import { GraphQLError } from "graphql";

const resolvers = {
    Query: {
        searchUsers: async (_: any, { username }: any, { supabase }: any): Promise<any> => {
            try {
                const { data, error } = await supabase.rpc("find_users_by_username", { p_username: username });

                if (error) {
                    console.error("searchUsers error", error);
                    throw new GraphQLError(error?.message);
                }

                return data;
            } catch (error: any) {
                console.error("searchUsers error", error);
                throw new GraphQLError(error?.message);
            }
        },
        getUserDataById: async function (_: any, __: any, { supabase, userId }: any): Promise<any> {
            try {
                if (!userId) {
                    return null;
                }

                const { data, error } = await supabase.rpc("get_public_profile_by_id", { user_id: userId });
                
                if (error) {
                    console.error("getUserDataById error", error);
                    throw new GraphQLError(error?.message);
                }

                return data;
            } catch (error: any) {
                console.error("getUserDataById error", error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    PublicProfile: {
        conversations: async function (_: any, __: any, { supabase, userId }: any): Promise<any> {
            if (!userId) {
                return null;
            }

            try {
                const { data, error } = await supabase.rpc("get_conversations_by_id", { user_id: userId });

                if (error) {
                    console.error("PublicProfileConversations error", error);
                    throw new GraphQLError(error?.message);
                }

                return data;
            } catch (error: any) {
                console.error("PublicProfileConversations error", error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    Mutation: {
        createUsername: async function (_: any, { username }: { username: string }, { supabase, userId }: any): Promise<any> {
            try {
                const { data: userData, error } = await supabase.rpc("upsert_public_profile_username", { user_id: userId, p_username: username });

                if (error) {
                    console.error("createUsername error", error);
                    return {
                        error,
                    };
                }

                return { userData };
            } catch (error: any) {
                console.error("createUsername error", error);
                return {
                    error,
                };
            }
        },
    },
};

export default resolvers;
