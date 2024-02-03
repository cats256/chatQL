import { MessageVariables, MessagesData } from "@/utils/types";
import { Flex, Stack } from "@chakra-ui/react";
import MessageOperations from "@/graphql/operations/messages";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";

interface MessageProps {
    userId: string;
    conversationId: string;
}

const Messages: React.FC<MessageProps> = ({ userId, conversationId }) => {
    const { data, loading, error, subscribeToMore } = useQuery<MessagesData, MessageVariables>(MessageOperations.Query.messages, {
        variables: {
            conversationId,
        },
        onError: ({ message }) => {
            toast.error(message);
        },
    });

    return (
        <Flex direction="column" justify="flex-end" overflow="hidden">
            {loading && (
                <Stack>
                    <span>LOADING MESSAGES</span>
                </Stack>
            )}
            {data?.messages && (
                <Flex direction="column-reverse" overflowY="scroll" height="100%">
                    {data.messages.map((message) => (
                        <div>{message.body}</div>
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default Messages;
