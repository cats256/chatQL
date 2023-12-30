"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/apollo-client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
