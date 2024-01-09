"use client";

import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import React from "react";
import MessagesHeader from "./Messages/Header";

type FeedWrapperProps = { session: Session };

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
    const searchParams = useSearchParams();
    const conversationId = searchParams?.get("conversationId");
    const {
        user: { id: userId },
    } = session;

    return (
        <Flex display={{ base: conversationId ? "flex" : "none", md: "flex" }} width="100%" direction="column">
            {conversationId ? (
                <Flex direction="column" justify="space-between" overflow="hidden" flexGrow={1} border="1px solid red">
                    <MessagesHeader userId={userId} conversationId={conversationId} />
                </Flex>
            ) : (
                <div>No Conversation Selected</div>
            )}
        </Flex>
    );
};
export default FeedWrapper;
