import { gql } from "@apollo/client";

export const SAVE_SOLVE = gql`
  mutation Solve(
    $scramble: String!
    $time: String!
    $penalty: String!
    $puzzle: String!
    $userId: String!
    $solveSessionId: String
  ) {
    createSolve(
      scramble: $scramble
      time: $time
      penalty: $penalty
      puzzle: $puzzle
      userId: $userId
      solveSessionId: $solveSessionId
    ) {
      id
      scramble
      time
      penalty
      user {
        name
      }
    }
  }
`;
