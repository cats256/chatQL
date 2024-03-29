import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import ConversationList from "./ConversationsList";

interface ConversationsWrapperProps {
    conversations: any;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ conversations }) => {
    const searchParams = useSearchParams();
    const conversationId = searchParams?.get("conversationId");

    return (
        <Box
            display={{ base: conversationId ? "none" : "flex", md: "flex" }}
            width={{ base: "100%", md: "430px" }}
            flexDirection="column"
            bg="whiteAlpha.50"
            gap={4}
            py={6}
            px={3}
        >
            <ConversationList conversations={conversations} />
        </Box>
    );
};
export default ConversationsWrapper;
