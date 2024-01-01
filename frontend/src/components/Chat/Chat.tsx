import { Flex } from "@chakra-ui/react";
import { LogoutButton } from "../buttons";
import ConversationsWrapper from "./Conversation/ConversationsWrapper";
import FeedWrapper from "./Fed/FeedWrapper";
import { Session } from "next-auth";

interface ChatProps {
    session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
    return (
        <Flex height="100vh" border="1px solid red">
            <ConversationsWrapper session={session} />
            <FeedWrapper session={session} />
            <LogoutButton />
        </Flex>
    );
};

export default Chat;
