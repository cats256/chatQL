import { Flex } from "@chakra-ui/react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

interface ChatProps {
    conversations: any;
}

const Chat: React.FC<ChatProps> = ({ conversations }) => {
    return (
        <Flex height="100vh">
            <ConversationsWrapper conversations={conversations} />
            <FeedWrapper />
        </Flex>
    );
};

export default Chat;
