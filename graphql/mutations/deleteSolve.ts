import { gql } from "@apollo/client";

export const DELETE_SOLVE = gql`
  mutation DeleteSolve(
    $id: String!
  ) {
    deleteSolve(id: $id) {
      id
    }
  }
`;