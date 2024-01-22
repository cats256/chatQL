import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    const session = useContext(AuthContext)?.session;
    const token = session?.access_token;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
