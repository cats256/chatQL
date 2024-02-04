"use client";

import { Button, Image } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type LoginButtonProps = {
    isLoginLoading: boolean | undefined;
};

type LogoutButtonProps = {};

export const LoginButton: React.FC<LoginButtonProps> = ({ isLoginLoading }) => {
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <Button onClick={handleSignIn} leftIcon={<Image height="20px" src="google-logo.png" alt="google-logo" />} isLoading={isLoginLoading}>
            Continue with Google
        </Button>
    );
};

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
    const supabase = createClientComponentClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <Button width="100%" onClick={handleSignOut}>
            Logout
        </Button>
    );
};
