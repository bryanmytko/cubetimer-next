import { gql } from "@apollo/client";

export const SOLVES_FOR_USER = gql`
  query SolvesForUser(
    $first: Int
    $last: Int
    $before: ID
    $after: ID
    $userId: String!
  ) {
    solves(
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
          puzzle
          scramble
          time
        }
      }
    }
  }
`;
