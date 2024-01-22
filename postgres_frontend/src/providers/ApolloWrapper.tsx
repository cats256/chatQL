"use client";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Session } from "@supabase/auth-helpers-nextjs";

interface ApolloProviderProps {
    session: Session | null;
    children: ReactNode;
}

export function ApolloWrapper({ session, children }: ApolloProviderProps) {
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include",
    });

    const authLink = setContext((_, { headers }) => {
        const token = session?.access_token;

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
