"use client";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClient();

export default function Home() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then((object) => {
            setSession(object);
        });
    }, []);

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    console.log(session);

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

// look up supabase verify access token
