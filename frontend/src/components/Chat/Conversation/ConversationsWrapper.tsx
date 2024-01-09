import { Session } from "next-auth";
import { Box, Progress, Spinner } from "@chakra-ui/react";
import React, { use, useEffect, useRef } from "react";
import ConversationOperations from "@/graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import ConversationList from "./ConversationList";
import { ConversationsData } from "@/utils/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import toast from "react-hot-toast";
import { useSubscription, gql } from "@apollo/client";

type ConversationsWrapperProps = { session: Session };

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
    const {
        data: conversationsData,
        error: conversationsError,
        loading: conversationsLoading,
        subscribeToMore,
    } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
    const conversationIdsSet = useRef(new Set<string>());

    const initializedConversationsSet = useRef(false);

    const subscribeToNewConversations = () => {
        subscribeToMore({
            document: ConversationOperations.Subscriptions.conversationCreated,
            updateQuery: (prev, { subscriptionData }: { subscriptionData: { data: { conversationCreated: ConversationPopulated } } }) => {
                if (!subscriptionData.data) return prev;

                const newConversation = subscriptionData.data.conversationCreated;

                if (conversationIdsSet.current.has(newConversation.id)) return prev;

                conversationIdsSet.current.add(newConversation.id);

                return Object.assign({}, prev, {
                    conversations: [newConversation, ...prev.conversations],
                });
            },
        });
    };

    useEffect(() => {
        subscribeToNewConversations();
    }, []);

    useEffect(() => {
        if (!conversationsLoading && !initializedConversationsSet.current) {
            initializedConversationsSet.current = true;
            conversationIdsSet.current = new Set(conversationsData?.conversations.map((conversation) => conversation._id));
        }
    }, [conversationsLoading]);

    if (conversationsError) {
        toast.error("There was an error fetching conversations");
        return null;
    }

    return (
        <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
            <ConversationList session={session} conversations={conversationsData?.conversations || []} />
            {conversationsLoading && <Progress size="xs" isIndeterminate />}
        </Box>
    );
};

export default ConversationsWrapper;
