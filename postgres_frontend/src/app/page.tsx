"use client";

import { LoginButton } from "@/components/buttons";
import { AuthContext } from "@/providers/AuthProvider";
import { createBrowserClient } from "@supabase/ssr";
import { useContext } from "react";

export default function Home() {
    const context = useContext(AuthContext);

    return context?.session ? <div>Logged in</div> : <LoginButton isLoading={context?.isLoading} />;
}
