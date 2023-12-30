"use client";

import { Session } from "next-auth";
import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { LoginButton } from "@/components/buttons";
import { useState } from "react";

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
    const [username, setUsername] = useState<string>("");
    const onSubmit = async () => {
        try {
            /**
             * createUsername mutation to send username to GraphQL API
             */
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Center height="100vh" border="1px solid red">
            <Stack spacing={2} align="center">
                {session ? (
                    <>
                        <Text>Create a Username</Text>
                        <Input placeholder="Enter a username" onChange={(event) => setUsername(event.target.value)} />
                        <Button onClick={onSubmit}>Save</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">ChatQL</Text>
                        <LoginButton />
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
