import { gql } from "graphql-tag";

const typeDefs = gql`
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

export default typeDefs;
