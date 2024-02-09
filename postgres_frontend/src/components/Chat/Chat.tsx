import { Flex } from "@chakra-ui/react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

interface ChatProps {
    conversations: any;
    username: string;
}

const Chat: React.FC<ChatProps> = ({ conversations, username }) => {
    return (
        <Flex height="100vh">
            <ConversationsWrapper conversations={conversations} />
            <FeedWrapper username={username} />
        </Flex>
    );
};

export default Chat;
