import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

interface MyContext {
    token?: String;
}

async function main() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        })
    );

    const PORT = 4000;

    try {
        await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    } catch (error) {
        console.error("Error while starting server", error);
    }
}

main();
