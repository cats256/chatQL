"use client";
import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, update } = useSession();
    return <Box>{session?.user.username}{session?.user?.username ? <Chat /> : <Auth session={session} update={update} />}</Box>;
}
