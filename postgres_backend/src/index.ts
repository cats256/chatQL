import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

interface MyContext {
    token?: String;
}

const getTokenFromReq = (req: any) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.split(" ")[1];
    }
    return null;
};

async function main() {
    dotenv.config();
    const app = express();
    const httpServer = http.createServer(app);
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true,
    };
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(corsOptions),
        express.json(),
        cookieParser(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
                const token = getTokenFromReq(req);
                const {
                    data: { user },
                } = await supabase.auth.getUser(token);

                return { supabase, userId: user?.id };
            },
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
