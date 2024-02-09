import { gql } from "graphql-tag";

const typeDefs = gql`
    type Mutation {
        CreateConversation(participant_ids: String!): conversation_id: String
    }
`;

export default typeDefs;
