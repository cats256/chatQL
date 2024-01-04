"use client";

import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import React from "react";

type FeedWrapperProps = { session: Session };

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
    const searchParams = useSearchParams();
    const conversationId = searchParams?.get("conversationId");

    console.log(conversationId);

    return (
        <Flex display={{ base: conversationId ? "flex" : "none", md: "flex" }} width="100%" direction="column">
            {conversationId ? <Flex>{conversationId}</Flex> : <div>No Conversation Selected</div>}
        </Flex>
    );
};
export default FeedWrapper;
