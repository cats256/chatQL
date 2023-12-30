const resolvers = {
    Query: {
        searchUsers: () => {},
    },
    Mutation: {
        createUsername: () => {
            console.log("createUsername called");
        },
    },
};

export default resolvers;
