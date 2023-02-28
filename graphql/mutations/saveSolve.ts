import { gql } from "@apollo/client";

export const SAVE_SOLVE = gql`
  mutation Solve(
    $scramble: String!
    $time: String!
    $puzzle: String!
    $userId: String!
  ) {
    createSolve(
      scramble: $scramble
      time: $time
      puzzle: $puzzle
      userId: $userId
    ) {
      scramble
      time
      user {
        name
      }
    }
  }
`;