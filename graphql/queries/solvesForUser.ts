import { gql } from "@apollo/client";

export const SOLVES_FOR_USER = gql`
  query SolvesForUser($userId: String!){
    solves(userId: $userId) {
      id
      puzzle
      scramble
      time
    }
  }
`;