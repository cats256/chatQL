import { gql } from "graphql-tag";

const typeDefs = gql`
    type CreateConversationResponse {
        conversationId: String
    }

    type Mutation {
        createConversation(participantIds: [String]): CreateConversationResponse
        markConversationAsRead(userId: String!, conversationId: String!): Boolean
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

    type Subscription {
        conversationCreated: Conversation
    }
`;

export default typeDefs;
