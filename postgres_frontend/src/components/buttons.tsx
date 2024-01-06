"use client";

import { Button, Image } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type LoginButtonProps = {
    isLoading: boolean | undefined;
};

export const LoginButton: React.FC<LoginButtonProps> = ({ isLoading }) => {
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <Button onClick={handleSignIn} leftIcon={<Image height="20px" src="google-logo.png" alt="google-logo" />} isLoading={isLoading}>
            Continue with Google
        </Button>
    );
};
