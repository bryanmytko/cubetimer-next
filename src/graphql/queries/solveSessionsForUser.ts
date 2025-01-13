import { gql } from "@apollo/client";

export const SOLVE_SESSIONS_FOR_USER = gql`
  query SolveSessionsForUser(
    $first: Int
    $last: Int
    $before: ID
    $after: ID
    $userId: String!
  ) {
    solveSessionsForUser(
      first: $first
      last: $last
      before: $before
      after: $after
      userId: $userId
    ) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          size
          createdAt
          solves {
            id
            scramble
            time
            puzzle
            createdAt
          }
        }
      }
    }
  }
`;
