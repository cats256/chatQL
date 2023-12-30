import { LoginButton, LogoutButton } from "@/components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
    const data = await getServerSession(authOptions);
    console.log(data);

    return (
        <div>
            {data?.user ? <LogoutButton /> : <LoginButton />}
            {data?.user?.name}
        </div>
    );
}
