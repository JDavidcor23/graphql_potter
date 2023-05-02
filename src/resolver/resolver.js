import Character from "../models/character.model.js";

export const resolvers = {
  Query: {
    characters: async (__, args, context) => {
      return await Character.collection.find({}).toArray();
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
