import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

const formatRelativeLocale = {
    lastWeek: "eeee",
    yesterday: "'Yesterday",
    today: "p",
    other: "MM/dd/yy",
};

interface ConversationItemProps {
    conversation: any;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
    const isSelected = false;
    const handleClick = () => null;
    return (
        <Stack
            direction="row"
            align="center"
            justify="space-between"
            p={4}
            cursor="pointer"
            borderRadius={4}
            bg={isSelected ? "whiteAlpha.200" : "none"}
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={handleClick}
            onContextMenu={handleClick}
            position="relative"
        >
            <Avatar />
            <Flex justify="space-between" width="80%" height="100%">
                <Flex direction="column" width="70%" height="100%">
                    <Text fontWeight={600} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        {/* {formatUsernames(conversation.participants, userId)} */}
                        {conversation.id}
                    </Text>
                    {/* {conversation.latestMessage && (
                        <Box width="140%">
                            <Text color="whiteAlpha.700" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                {conversation.latestMessage.body}
                            </Text>
                        </Box>
                    )} */}
                </Flex>
                <Text color="whiteAlpha.700" textAlign="right" position="absolute" right={4}>
                    {formatRelative(new Date(conversation.created_at), new Date(), {
                        locale: {
                            ...enUS,
                            formatRelative: (token: any) => formatRelativeLocale[token as keyof typeof formatRelativeLocale],
                        },
                    })}
                </Text>
            </Flex>
        </Stack>
    );
};
export default ConversationItem;
