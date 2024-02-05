import { MessageVariables, MessageSubscriptionData, MessagesData } from "@/utils/types";
import { Flex, Stack } from "@chakra-ui/react";
import MessageOperations from "@/graphql/operations/messages";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import MessageItem from "./MessageItem";
import { useEffect } from "react";

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

    const subscribeToMoreMessages = (conversationId: string) => {
        subscribeToMore({
            document: MessageOperations.Subscription.messageSent,
            variables: {
                conversationId,
            },
            updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
                if (!subscriptionData) return prev;

                console.log("HERE IS SUBSCRIPTION DATA", subscriptionData);

                const newMessage = subscriptionData.data.messageSent;
                
                console.log(prev)

                return Object.assign({}, prev, {
                    messages:
                        newMessage.sender.id === userId
                            ? prev.messages
                            : [newMessage, ...prev.messages],
                });
            },
        });
    };

    useEffect(() => {
        subscribeToMoreMessages(conversationId);
    }, [conversationId]);

    return (
        <Flex direction="column" justify="flex-end" overflow="hidden">
            {loading && (
                <Stack spacing={4} px={4}>
                    <SkeletonLoader count={4} height='60px' />
                </Stack>
            )}
            {data?.messages && (
                <Flex direction="column-reverse" overflowY="scroll" height="100%">
                    {data.messages.map((message) => (
                        <MessageItem
                            key={message.id}
                            message={message}
                            sentByMe={message.sender.id === userId}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default Messages;
