import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";
import React, { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationItem";
import { useSearchParams } from "next/navigation";

type ConversationListProps = {
    session: Session;
    conversations: Array<ConversationPopulated>;
    onViewConversation: (conversationId: string) => void;
};

const ConversationList: React.FC<ConversationListProps> = ({ conversations, session, onViewConversation }) => {
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const {
        user: { id: userId },
    } = session;

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box
            width={{ base: "100%", md: "400px" }}
            position="relative"
            height="100%"
            overflow="hidden"
        >
            <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
                <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
                    Find or start a conversation
                </Text>
            </Box>
            <ConversationModal isOpen={isOpen} onClose={onClose} />
            {conversations.map((conversation) => (
                <ConversationItem
                    userId={userId}
                    key={conversation.id}
                    conversation={conversation}
                    onClick={() => onViewConversation(conversation.id)}
                    isSelected={conversation.id === searchParams?.get("conversationId")}
                />
            ))}
        </Box>
    );
};
export default ConversationList;
