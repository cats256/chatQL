import { gql } from "@apollo/client";

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
                }
            }
        `,
    },
    Mutations: {
        createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `,
    },
    Subscriptions: {},
};

export default userOperations;
