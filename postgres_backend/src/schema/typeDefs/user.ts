import { gql } from "graphql-tag";

module.exports.typeDefs = gql`
    type User {
        id: String
        name: String
        username: String
        email: String
        emailVerified: Boolean
        image: String
    }

    type Query {}
`;
