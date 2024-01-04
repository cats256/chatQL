import { gql } from "apollo-server-core";

const typeDefs = gql`
    type CreateConversationResponse {
        conversationId: String
    }

    type Mutation {
        createConversation(participantIds: [String]): CreateConversationResponse
    }

    type Participant {
        id: String
        user: User
        hasSeenLatestMessage: Boolean
    }

    type Conversation {
        id: String
        latestMessage: Message
        participants: [Participant]
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        conversations: [Conversation]
    }
`;

export default typeDefs;
