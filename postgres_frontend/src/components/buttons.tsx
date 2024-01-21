"use client";

import { Button, Image } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import router from "next/router";
import { useEffect } from "react";

type LoginButtonProps = {
    isLoginLoading: boolean | undefined;
};

type LogoutButtonProps = {
    isLoading: boolean | undefined;
};

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

export const LogoutButton: React.FC<LogoutButtonProps> = ({ isLoading }) => {
    const supabase = createClientComponentClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <Button onClick={handleSignOut} isLoading={isLoading}>
            Logout
        </Button>
    );
};
