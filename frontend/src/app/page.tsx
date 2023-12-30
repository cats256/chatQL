"use server";

import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

async function reloadSession() {
    "use server";
}

export default async function Home() {
    const session = await getServerSession(authOptions);

    return <Box>{session?.user?.username ? <Chat /> : <Auth session={session} />}</Box>;
}
