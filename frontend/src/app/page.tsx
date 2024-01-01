"use client";
import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status, update } = useSession();
    return (
        <Box>
            {session?.user?.username ? <Chat session={session} /> : <Auth session={session} update={update} isLoginLoading={status === "loading"} />}
        </Box>
    );
}
