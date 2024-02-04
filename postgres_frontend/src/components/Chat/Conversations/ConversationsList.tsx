import { LogoutButton } from "@/components/buttons";
import { Box, Text } from "@chakra-ui/react";
import ConversationItem from "./ConversationItem";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
    conversations: any[];
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box width={{ base: "100%", md: "400px" }} position="relative" height="100%" overflow="hidden">
            <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
                <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
                    Find or start a conversation
                </Text>
            </Box>
            <ConversationModal isOpen={isOpen} onClose={onClose} />
            {conversations.map((conversation) => {
                return <ConversationItem conversation={conversation} />;
            })}
            <Box position="absolute" bottom={0} left={0} width="100%" px={8}>
                <LogoutButton />
            </Box>
        </Box>
    );
};
export default ConversationList;
