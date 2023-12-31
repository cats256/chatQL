"use client";
import { Button, Image } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";

interface LoginButtonProps {
    isLoginLoading: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ isLoginLoading }) => {
    return (
        <Button onClick={() => signIn("google")} leftIcon={<Image height="20px" src="google-logo.png" />} isLoading={isLoginLoading}>
            Continue with Google
        </Button>
    );
};
export const LogoutButton = () => {
    return <Button onClick={() => signOut()}>Logout</Button>;
};
