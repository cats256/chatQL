"use client";
import { LoginButton } from "@/components/buttons";
import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
    const [username, setUsername] = useState<string>("");
    const [createUsername, { data, loading, error }] = useMutation<CreateUsernameData, CreateUsernameVariables>(
        UserOperations.Mutations.createUsername
    );

    const onSubmit = async () => {
        if (!username) return;
        try {
            await createUsername({ variables: { username } });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Center height="100vh" border="1px solid red">
            <Stack spacing={6} align="center">
                {session ? (
                    <>
                        <Input placeholder="Enter a username" onChange={(event) => setUsername(event.target.value)} />
                        <Button width="100%" onClick={onSubmit}>
                            Save
                        </Button>
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
