import { gql } from "@apollo/client";

export const SOLVE_SESSIONS_FOR_USER = gql`
  query SolveSessionsForUser($userId: String!){
    solveSessionsForUser(userId: $userId) {
      id
      solves {
        scramble
        time
      }
    }
  }
`;