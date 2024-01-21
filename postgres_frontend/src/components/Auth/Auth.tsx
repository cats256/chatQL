"use client";
import { LoginButton } from "@/components/buttons";
import UserOperations from "@/graphql/operations/user";
import { AuthContext } from "@/providers/AuthProvider";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

interface IAuthProps {
    update: () => void;
}

const Auth: React.FC<IAuthProps> = ({ update }) => {
    const session = useContext(AuthContext)?.session;
    const isLoginLoading = useContext(AuthContext)?.isLoading;

    const [username, setUsername] = useState<string>("");
    const [createUsername, { loading: usernameLoading }] = useMutation<CreateUsernameData, CreateUsernameVariables>(
        UserOperations.Mutations.createUsername
    );

    const onSubmit = async () => {
        if (!username) return;
        try {
            const { data } = await createUsername({ variables: { username } });

            if (!data?.createUsername) {
                throw new Error();
            }

            if (data.createUsername.error) {
                throw new Error(data.createUsername.error);
            }

            toast.success("Username created!");

            await update();
        } catch (error: any) {
            toast.error(error?.message);
            console.error(error);
        }
    };
    return (
        <Center height="100vh">
            <Stack spacing={6} align="center">
                {session ? (
                    <>
                        <Input placeholder="Enter a username" onChange={(event) => setUsername(event.target.value)} />
                        <Button width="100%" onClick={onSubmit} isLoading={usernameLoading}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">ChatQL</Text>
                        <LoginButton isLoginLoading={isLoginLoading} />
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
