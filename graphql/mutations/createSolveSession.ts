import { gql } from "@apollo/client";

export const CREATE_SOLVE_SESSION = gql`
  mutation CreateSolveSession(    
    $userId: String!
    $size: Int!
  ) {
    createSolveSession(
      userId: $userId
      size: $size
    ) {
      id
      solves {
        id
        time
      }
    }
  }
`;