"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";

export const AuthContext = createContext<{ session: Session | null; isLoading: boolean } | null>(null);

interface AuthProviderProps {
    session: Session | null;
    accessToken: string | undefined;
    children: ReactNode;
}

const AuthProvider = ({ session, accessToken, children }: AuthProviderProps) => {
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((_, session) => {
            if (session?.access_token !== accessToken) {
                router.refresh();
            }
            setIsLoading(false);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase, router]);

    return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
