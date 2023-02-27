export const typeDefs = `
  type User {
    id: ID
    name: String
    email: String
    solves: [Solve]
  }

  type Solve {
    id: ID
    puzzle: String
    scramble: String
    time: String
    user: User
  }

  type Query {
    solves: [Solve]!
  }
`;
