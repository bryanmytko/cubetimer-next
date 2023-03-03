import { gql } from "@apollo/client";

export const DELETE_SOLVE = gql`
  mutation Solve(
    $id: Number!
  ) {
    deleteSolve(
      id: $id
    )
  }
`;