import { GraphQLContext } from "../../util/types";

const resolvers = {
    Mutation: {
        createConversation: async (_: any, args: { participantsIds: Array<string> }, context: GraphQLContext) => {
            console.log("createConversation called", args);
        },
    },
};

export default resolvers;
