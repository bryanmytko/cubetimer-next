import { gql } from "@apollo/client";

export const SOLVES_FOR_USER = gql`
  query SolvesForUser(
    $first: Int
    $last: Int
    $before: ID
    $after: ID
  ) {
    solves(
      first: $first
      last: $last
      before: $before
      after: $after
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
          penalty
          createdAt
        }
      }
    }
  }
`;
