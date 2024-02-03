import { gql } from "graphql-tag";

const typeDefs = gql`
    scalar Date

    type User {
        id: String
        name: String
        username: String
        email: String
        emailVerified: Boolean
        image: String
    }

    type Query {
        searchUsers(username: String): [User]
    }

    type Mutation {
        createUsername(username: String): CreateUsernameResponse
    }

    type CreateUsernameResponse {
        success: Boolean
        error: String
    }

    type PublicProfile {
        id: String
        created_at: Date
        username: String
    }

    type Query {
        getUserDataById: PublicProfile
    }
`;

export default typeDefs;
