import { gql } from "@apollo/client";

export const CREATE_SOLVE_SESSION = gql`
  mutation CreateSolveSession($size: Int!) {
    createSolveSession(size: $size) {
      id
      solves {
        id
        time
      }
    }
  }
`;