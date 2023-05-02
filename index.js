import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import pkg from "body-parser";
import cors from "cors";
import { typeDefs } from "./src/typeDefs/typeDefs.js";
import { resolvers } from "./src/resolver/resolver.js";
import "./src/db.js";

const app = express();
const { json } = pkg;
const httpServer = http.createServer(app);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
}
startApolloServer();
