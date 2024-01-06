"use client";

import { LoginButton } from "@/components/buttons";
import { AuthContext } from "@/providers/AuthProvider";
import { Center, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";

export default function Home() {
    const context = useContext(AuthContext);

    return context?.session ? (
        <div>Logged in</div>
    ) : (
        <Center height="100vh">
            <Stack spacing={6} align="center">
                <Text fontSize="3xl">ChatQL</Text>
                <LoginButton isLoading={context?.isLoading} />
            </Stack>
        </Center>
    );
}
