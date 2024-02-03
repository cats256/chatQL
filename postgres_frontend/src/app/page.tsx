"use client";

import Auth from "@/components/Auth/Auth";
import { LoginButton, LogoutButton } from "@/components/buttons";
import userOperations from "@/graphql/operations/user";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@apollo/client";
import { Center, Stack, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const { data: userData, error: userDataError, loading: userDataLoading } = useQuery(userOperations.Queries.getUserDataById);

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

    if (userDataError) {
        console.error("userDataError", userDataError.message);
        toast.error(userDataError.message);
    }

    console.log(userData);
    console.log(userData?.getUserDataById);
    console.log(userData?.getUserDataById?.username);

    return !userDataLoading && (userData?.getUserDataById?.username ? <LogoutButton isLoading={context?.isLoading} /> : <Auth />);
}
