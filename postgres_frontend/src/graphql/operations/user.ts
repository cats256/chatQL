import { gql } from "@apollo/client";

const ConversationDataFields = `
    id
    created_at
`

const UserDataFields = `
    id
    created_at
    username
`;

const userOperations = {
    Queries: {
        searchUsers: gql`
            query SearchUsers($username: String!) {
                searchUsers(username: $username) {
                    id
                    username
                }
            }
        `,
        getUserDataById: gql`
            query GetUserDataById {
                getUserDataById {
                    ${UserDataFields}
                    conversations {
                        ${ConversationDataFields}
                    }
                }
            }
        `,
    },
    Mutations: {
        createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    userData {
                        ${UserDataFields}
                    }
                    error
                }
            }
        `,
    },
    Subscriptions: {},
};

export default userOperations;
