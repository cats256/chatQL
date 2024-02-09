import { gql } from "@apollo/client";

const conversationOperations = {
    Mutations: {
        createConversation: gql`
            mutation CreateConversation($participant_ids: [String]!) {
                createConversation(participant_ids: $participant_ids) {
                    conversation_id
                }
            }
        `,
    },
};

export default conversationOperations;
