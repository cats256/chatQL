import UserOperations from "@/graphql/operations/user";
import { CreateConversationData, CreateConversationInput, SearchUsersData, SearchUsersInput, SearchedUser } from "@/utils/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import UserSearchList from "./UserSearchList";
import Participant from "./Participants";
import toast from "react-hot-toast";
import ConversationOperations from "@/graphql/operations/conversation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
    const [searchUsers, { data, loading: searchUsersLoading }] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.searchUsers);
    const [createConversation, { loading: createConversationLoading }] = useMutation<CreateConversationData, CreateConversationInput>(
        ConversationOperations.Mutations.createConversation
    );
    const { data: session } = useSession();
    const {
        user: { id: userId },
    } = session as Session;

    const addParticipant = (user: SearchedUser) => {
        setParticipants((prevParticipants) =>
            prevParticipants.some((participant) => participant.id === user.id) ? prevParticipants : [...prevParticipants, user]
        );
        setUsername("");
    };

    const removeParticipant = (userId: string) => {
        setParticipants((prevParticipants) => prevParticipants.filter((participant) => participant.id !== userId));
    };

    const onSearch = async (event: FormEvent) => {
        event.preventDefault();
        searchUsers({ variables: { username } });
    };

    const onCreateConversation = async () => {
        const participantIds = [userId, ...participants.map((participant) => participant.id)];
        try {
            const { data } = await createConversation({
                variables: {
                    participantIds,
                },
            });

            if (!data?.createConversation) {
                toast.error("Failed to create conversation");
                throw new Error("Failed to create conversation");
            }

            const {
                createConversation: { conversationId },
            } = data;

            router.push(`?conversationId=${conversationId}`);

            setParticipants([]);
            setUsername("");
            onClose();
        } catch (error: any) {
            console.error("onCreateConversation", error);
            toast.error(error?.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#2d2d2d" pb={4}>
                <ModalHeader>Find a User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={onSearch}>
                        <Stack spacing={4}>
                            <Input placeholder="Enter a username" value={username} onChange={(event) => setUsername(event.target.value)} />
                            <Button type="submit" disabled={!username} isLoading={searchUsersLoading}>
                                Search
                            </Button>
                        </Stack>
                    </form>
                    {data?.searchUsers && <UserSearchList users={data.searchUsers} addParticipant={addParticipant}></UserSearchList>}
                    {participants.length !== 0 && (
                        <>
                            <Participant participants={participants} removeParticipant={removeParticipant} />
                            <Button
                                bg="brand.100"
                                width="100%"
                                mt={6}
                                _hover={{ bg: "brand.100" }}
                                isLoading={createConversationLoading}
                                onClick={onCreateConversation}
                            >
                                Create Conversation
                            </Button>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ConversationModal;
