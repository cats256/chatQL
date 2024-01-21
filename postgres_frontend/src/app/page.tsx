"use client";

import Auth from "@/components/Auth/Auth";
import { LoginButton, LogoutButton } from "@/components/buttons";
import { AuthContext } from "@/providers/AuthProvider";
import { Center, Stack, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
    const context = useContext(AuthContext);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("code")) {
            const url = new URL(window.location.href);

            const params = new URLSearchParams(url.search);
            params.delete("code");

            router.replace(`${url.pathname}?${params.toString()}`);
        }
    }, [router, searchParams, pathname]);

    console.log(context?.session);

    return context?.session?.user?.user_metadata?.username ? <LogoutButton isLoading={context?.isLoading} /> : <Auth update={() => {}} />;
}
