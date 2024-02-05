import SkeletonLoader from "@/components/common/SkeletonLoader";
import ConversationOperations from "@/graphql/operations/conversation";
import { ConversationsData } from "@/utils/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ConversationPopulated, ParticipantPopulated } from "../../../../../backend/src/util/types";
import ConversationList from "./ConversationList";

type ConversationsWrapperProps = { session: Session };

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
    const {
        data: conversationsData,
        error: conversationsError,
        loading: conversationsLoading,
        subscribeToMore,
    } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
    const [markConversationAsRead] = useMutation<
        { markConversationAsRead: boolean },
        { userId: string; conversationId: string }
    >(ConversationOperations.Mutations.markConversationAsRead);
    const {
        user: { id: userId },
    } = session;

    const searchParams = useSearchParams();
    const conversationId = searchParams?.get("conversationId");

    const conversationIdsSet = useRef(new Set<string>());
    const initializedConversationsSet = useRef(false);

    const router = useRouter();
    const onViewConversation = async (conversationId: string, hasSeenLatestMessage: boolean | undefined) => {
        router.push(`?conversationId=${conversationId}`);

        if (hasSeenLatestMessage) {
            return;
        }

        try {
            await markConversationAsRead({
                variables: {
                    userId,
                    conversationId,
                },
                optimisticResponse: {
                    markConversationAsRead: true,
                },
                update: (cache) => {
                    const participantsFragment = cache.readFragment<{
                        participants: Array<ParticipantPopulated>;
                    }>({
                        id: `Conversation:${conversationId}`,
                        fragment: gql`
                    fragment Participants on Conversation {
                      participants {
                        user {
                          id
                          username
                        }
                        hasSeenLatestMessage
                      }
                    }
                  `,
                    });

                    if (!participantsFragment) return;

                    const participants = [...participantsFragment.participants];

                    const userParticipantIdx = participants.findIndex(
                        (p) => p.user.id === userId
                    );

                    if (userParticipantIdx === -1) return;

                    const userParticipant = participants[userParticipantIdx];

                    participants[userParticipantIdx] = {
                        ...userParticipant,
                        hasSeenLatestMessage: true,
                    };

                    cache.writeFragment({
                        id: `Conversation:${conversationId}`,
                        fragment: gql`
                    fragment UpdatedParticipant on Conversation {
                      participants
                    }
                  `,
                        data: {
                            participants,
                        },
                    });
                },
            });
        } catch (error) {
            console.log("onViewConversation error", error);
        }
    };

    const subscribeToNewConversations = () => {
        subscribeToMore({
            document: ConversationOperations.Subscriptions.conversationCreated,
            updateQuery: (prev, { subscriptionData }: { subscriptionData: { data: { conversationCreated: ConversationPopulated } } }) => {
                if (!subscriptionData.data) return prev;

                const newConversation = subscriptionData.data.conversationCreated;

                if (conversationIdsSet.current.has(newConversation.id)) return prev;

                conversationIdsSet.current.add(newConversation.id);

                return Object.assign({}, prev, {
                    conversations: [newConversation, ...prev.conversations],
                });
            },
        });
    };

    useEffect(() => {
        subscribeToNewConversations();
    }, []);

    useEffect(() => {
        if (!conversationsLoading && !initializedConversationsSet.current) {
            initializedConversationsSet.current = true;
            conversationIdsSet.current = new Set(conversationsData?.conversations.map((conversation) => conversation.id));
        }
    }, [conversationsLoading]);

    if (conversationsError) {
        toast.error("There was an error fetching conversations");
        return null;
    }

    return (
        <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3} display={{ base: conversationId ? "none" : "flex", md: "flex" }}>
            {conversationsLoading ? <SkeletonLoader count={7} height="80px" width="360px" /> :
                <ConversationList session={session} conversations={conversationsData?.conversations || []} onViewConversation={onViewConversation} />}
        </Box>
    );
};

export default ConversationsWrapper;
