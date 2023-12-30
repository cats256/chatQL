import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

export default async function Home() {
    const data = await getServerSession(authOptions);

    return <Box>{data?.user?.username ? <Chat /> : <Auth />}</Box>;
}
