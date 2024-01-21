import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";

interface MessageInputProps {
    session: Session;
    conversationId: string;
}

const MessageInput = ({ session, conversationId }: MessageInputProps) => {
    const [messageBody, setMessageBody] = useState("");

    const onSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        // try {

        // } catch (error: any) {
        //     console.log(error);
        // }
    };

    return (
        <Box px={4} py={6} width="100%">
            <form onSubmit={() => {}}>
                <Input
                    value={messageBody}
                    onChange={(event) => setMessageBody(event.target.value)}
                    placeholder="Message"
                    size="md"
                    resize="none"
                    _focus={{ boxShadow: "none", border: "1px solid", borderColor: "whiteAlpha.300" }}
                />
            </form>
        </Box>
    );
};

export default MessageInput;
