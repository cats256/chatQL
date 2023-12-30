"use client";
import { Button, Image } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
    return (
        <Button onClick={() => signIn("google")} leftIcon={<Image height="20px" src="google-logo.png" />}>
            Continue with Google
        </Button>
    );
};

export const LogoutButton = () => {
    return <Button onClick={() => signOut()}>Logout</Button>;
};
