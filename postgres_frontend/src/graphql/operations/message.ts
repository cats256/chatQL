import { gql } from "@apollo/client";

export const MessageFields = `
    id
    created_at
    body
    conversation_id
    username
`;

export default {
    Mutation: {
        sendMessage: gql`
            mutation SendMessage($id: String!, $conversationId: String!, $username: String!, $body: String!) {
                sendMessage(id: $id, conversationId: $conversationId, username: $username, body: $body)
            }
        `,
    },
};
