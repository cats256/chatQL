"use client";

import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import userOperations from "@/graphql/operations/user";
import { useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from 'react-hot-toast';

export default function Home() {
    const { data: userData, error: userDataError, loading: userDataLoading } = useQuery(userOperations.Queries.getUserDataById);
    console.log(userData)
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

    return !userDataLoading && (userData?.getUserDataById?.username ? <Chat conversations={userData.getUserDataById.conversations} /> : <Auth />);
}
