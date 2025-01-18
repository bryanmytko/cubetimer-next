import { gql } from "@apollo/client";

export const DELETE_SOLVE_SESSION = gql`
  mutation DeleteSolveSession($id: String!) {
    deleteSolveSession(id: $id) {
      id
    }
  }
`;
