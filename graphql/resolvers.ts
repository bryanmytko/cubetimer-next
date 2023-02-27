export const resolvers = {
  Query: {
    solves: () => {
      return [
        {
          id: 1,
          puzzle: "3x3",
          scramble: "R U F",
          time: "12.42",
          userId: 1,
        },
        {
          id: 2,
          puzzle: "3x3",
          scramble: "D R U F",
          time: "19.42",
          userId: 1,
        },
        {
          id: 3,
          puzzle: "3x3",
          scramble: "B R U F",
          time: "15.42",
          userId: 1,
        },
      ];
    },
  },
};
