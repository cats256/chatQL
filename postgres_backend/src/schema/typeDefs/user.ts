import { gql } from "graphql-tag";

const typeDefs = gql`
    scalar Date

    type User {
        id: String
        username: String
    }

    type CreateUsernameResponse {
        userData: PublicProfile
        error: String
    }

    type PublicProfile {
        id: String
        created_at: Date
        username: String
        conversations: [String]
    }

    type Query {
        searchUsers(username: String!): [User]
        getUserDataById: PublicProfile
    }

    type Mutation {
        createUsername(username: String!): CreateUsernameResponse
    }
`;

export default typeDefs;
