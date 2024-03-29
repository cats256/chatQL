import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { SendMessageArguments } from "../../../../../../backend/src/util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { v4 as uuidv4 } from "uuid";

// import { MessagesData } from "../../../../util/types";

interface MessageInputProps {
    conversationId: string;
    username: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId, username }) => {
    const [messageBody, setMessageBody] = useState("");
    const [sendMessage] = useMutation<{ sendMessage: boolean }>(MessageOperations.Mutation.sendMessage);

    const onSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const id = uuidv4();

            setMessageBody("");

            const { data, errors } = await sendMessage({
                variables: {
                    id,
                    username,
                    conversationId,
                    body: messageBody,
                },
            });

            //   const { data, errors } = await sendMessage({
            //     variables: {
            //       ...newMessage,
            //     },
            //     optimisticResponse: {
            //       sendMessage: true,
            //     },
            //     update: (cache) => {
            //       const existing = cache.readQuery<MessagesData>({
            //         query: MessageOperations.Query.messages,
            //         variables: { conversationId },
            //       }) as MessagesData;

            //       cache.writeQuery<MessagesData, { conversationId: string }>({
            //         query: MessageOperations.Query.messages,
            //         variables: { conversationId },
            //         data: {
            //           ...existing,
            //           messages: [
            //             {
            //               id: messageId,
            //               body: messageBody,
            //               senderId: session.user.id,
            //               conversationId,
            //               sender: {
            //                 id: session.user.id,
            //                 username: session.user.username,
            //               },
            //               createdAt: new Date(Date.now()),
            //               updatedAt: new Date(Date.now()),
            //             },
            //             ...existing.messages,
            //           ],
            //         },
            //       });
            //     },
            //   });

            if (!data?.sendMessage || errors) {
                throw new Error("Failed to send message");
            }
        } catch (error: any) {
            console.log("onSendMessage error", error);
            toast.error(error?.message);
        }
    };

    return (
        <Box px={4} py={6} width="100%">
            <form onSubmit={onSendMessage}>
                <Input
                    value={messageBody}
                    onChange={(event) => setMessageBody(event.target.value)}
                    placeholder="New message"
                    size="md"
                    resize="none"
                    _focus={{
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "whiteAlpha.300",
                    }}
                />
            </form>
        </Box>
    );
};

export default MessageInput;
