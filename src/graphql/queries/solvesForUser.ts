import { gql } from "@apollo/client";

export const SOLVES_FOR_USER = gql`
  query SolvesForUser($first: Int, $after: ID, $userId: String!) {
    solves(first: $first, after: $after, userId: $userId) {
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
