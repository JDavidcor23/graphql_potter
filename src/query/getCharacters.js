export const getCharacters = {
  query: `
  query {
    characters {
      _id
      name
      img
      isAlive
    }
  }
`,
};
