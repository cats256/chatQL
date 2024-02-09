import { gql } from "graphql-tag";

const typeDefs = gql`
    scalar Date

    type Conversation {
        id: String
        created_at: Date
    }

    type PublicProfile {
        id: String
        created_at: Date
        username: String
        conversations: [Conversation]
    }

    type Query {
        searchUsers(username: String!): [PublicProfile]
        getUserDataById: PublicProfile
    }

    type CreateUsernameResponse {
        userData: PublicProfile
        error: String
    }

    type Mutation {
        createUsername(username: String!): CreateUsernameResponse
    }
`;

export default typeDefs;
