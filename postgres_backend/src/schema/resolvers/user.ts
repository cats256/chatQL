import { GraphQLError } from "graphql";

const resolvers = {
    Query: {
        searchUsers: () => {},
        getUserDataById: async function (_: any, __: any, { supabase, userId }: any): Promise<any> {
            try {
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
    Mutation: {
        createUsername: async function (_: any, { username }: { username: string }, { supabase, userId }: any): Promise<any> {
            try {
                const { error } = await supabase.rpc("upsert_public_profile_username", { user_id: userId, p_username: username });

                if (error) {
                    console.error("createUsername error", error);
                    return {
                        error,
                    };
                }

                return { success: true };
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
