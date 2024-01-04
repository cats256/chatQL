import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { getSession } from "next-auth/react";
import { WebSocketServer } from "ws";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { GraphQLContext, Session, SubscriptionContext } from "./util/types";

async function main() {
    dotenv.config();
    const app = express();
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql/subscriptions",
    });
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const prisma = new PrismaClient();
    const serverCleanup = useServer(
        {
            schema,
            context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
                if (ctx.connectionParams && ctx.connectionParams.session) {
                    const { session } = ctx.connectionParams;
                    return { session, prisma };
                }

                return { session: null, prisma };
            },
        },
        wsServer
    );
    const corsOptions = {
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    };
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        context: async ({ req, res }): Promise<GraphQLContext> => {
            const session = (await getSession({ req })) as unknown as Session;
            return { session, prisma };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    await server.start();
    server.applyMiddleware({ app, cors: corsOptions });
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch((err) => console.error(err));
