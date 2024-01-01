import UserOperations from "@/graphql/operations/user";
import { SearchUsersData, SearchUsersInput } from "@/utils/types";
import { useLazyQuery } from "@apollo/client";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import UserSearchList from "./UserSearchList";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("");
    const [searchUsers, { data, error, loading }] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.searchUsers);

    console.log(data);
    const onSearch = async (event: FormEvent) => {
        event.preventDefault();
        searchUsers({ variables: { username } });
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
                            <Button type="submit" disabled={!username} isLoading={loading}>
                                Search
                            </Button>
                        </Stack>
                    </form>
                    {data?.searchUsers && <UserSearchList users={data.searchUsers}></UserSearchList>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default ConversationModal;
