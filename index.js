import { ApolloServer } from "@apollo/server";
import { gql } from "apollo-server";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import pkg from "body-parser";
import "./src/db.js";
import Character from "./src/models/character.model.js";
import cors from "cors";

const app = express();
const { json } = pkg;
const httpServer = http.createServer(app);

export const typeDefs = gql`
  type Character {
    _id: ID!
    name: String!
    img: String!
    isAlive: Boolean!
  }
  type Query {
    characters: [Character]
  }
  type Mutation {
    addCharacter(name: String!, img: String!, isAlive: Boolean!): Character!
    deleteCharacter(name: String!): String
    changeCharacterStatus(name: String!, isAlive: Boolean!): Character!
  }
`;

const resolvers = {
  Query: {
    characters: (__, args, context) => {
      return Character.collection.find({}).toArray();
    },
  },
  Mutation: {
    addCharacter: (__, { name, img, isAlive }) => {
      const newCharacter = new Character({ name, img, isAlive });
      return newCharacter.save();
    },
    deleteCharacter: (__, args) => {
      Character.collection.deleteOne({ name: args.name });
      return args.name;
    },
    changeCharacterStatus: (__, args) => {
      Character.collection.updateOne(
        { name: args.name },
        //$set significa que solo se va a cambiar el valor de isAlive
        { $set: { isAlive: !args.isAlive } }
      );
      return Character.collection.findOne({ name: args.name });
    },
  },
};
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));
  // ... Other middleware and routes
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
}
startApolloServer();
