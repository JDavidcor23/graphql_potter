import { gql } from "apollo-server";

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
