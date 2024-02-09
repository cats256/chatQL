import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
// import MessagesHeader from "./Messages/Header";
import MessageInput from "./Messages/Input";
// import Messages from "./Messages/Messages";
import NoConversation from "./NoConversation";

interface FeedWrapperProps {
    username: string;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ username }) => {
    const searchParams = useSearchParams();
    const conversationId = searchParams?.get("conversationId");

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            {/* <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages userId={userId} conversationId={conversationId} /> */}
          </Flex>
          <MessageInput conversationId={conversationId} username={username} />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
};
export default FeedWrapper;