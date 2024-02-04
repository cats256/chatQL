import { LogoutButton } from "@/components/buttons";
import { Box, Text } from "@chakra-ui/react";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
    conversations: any[];
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
    return (
        <Box width={{ base: "100%", md: "400px" }} position="relative" height="100%" overflow="hidden">
            <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer">
                <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
                    Find or start a conversation
                </Text>
            </Box>
            {/* <ConversationModal session={session} isOpen={isOpen} onClose={onClose} /> */}
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
