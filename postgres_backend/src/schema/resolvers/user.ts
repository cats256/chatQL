const resolvers = {
    Query: {
        searchUsers: () => {},
    },
    Mutation: {
        createUsername: async function (_: any, { username }: { username: string }, { supabase, userId }: any): Promise<any> {
            await supabase.rpc("upsert_profile", { p_id: userId, p_username: username });
            const { data, error } = await supabase.rpc("get_public_profiles");

            if (error) {
                console.error(error);
            }
            console.log(data[0].username);
        },
    },
};

export default resolvers;
