import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
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

    console.log("conversationsData", conversationsData);

    console.log(ConversationOperations.Subscriptions.conversationCreated);
    const { data, loading, error } = useSubscription(ConversationOperations.Subscriptions.conversationCreated);
    console.log("data", data);
    console.log("loading", loading);
    console.log("error", error);
    const subscribeToNewConversations = () => {
        subscribeToMore({
            document: ConversationOperations.Subscriptions.conversationCreated,
            updateQuery: (prev, { subscriptionData }: { subscriptionData: { data: { conversationCreated: ConversationPopulated } } }) => {
                console.log("updateQuery called");
                if (!subscriptionData.data) return prev;

                const newConversation = subscriptionData.data.conversationCreated;

                return Object.assign({}, prev, {
                    conversations: [newConversation, ...prev.conversations],
                });
            },
        });
    };

    useEffect(() => {
        subscribeToNewConversations();
        console.log("useEffect called");
    }, []);

    if (conversationsError) {
        toast.error("There was an error fetching conversations");
        return null;
    }

    console.log("ConversationWrapper", conversationsData);
    return (
        <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
            <ConversationList session={session} conversations={conversationsData?.conversations || []} />
        </Box>
    );
};

export default ConversationsWrapper;
