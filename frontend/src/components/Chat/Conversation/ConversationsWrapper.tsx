import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import React from "react";
import ConversationOperations from "@/graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import ConversationList from "./ConversationList";
import { ConversationsData } from "@/utils/types";

type ConversationsWrapperProps = { session: Session };

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
    const {
        data: conversationsData,
        error: conversationsError,
        loading: conversationsLoading,
    } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

    console.log("ConversationWrapper", conversationsData);
    return (
        <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
            <ConversationList session={session} />
        </Box>
    );
};

export default ConversationsWrapper;
