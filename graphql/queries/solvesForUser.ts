import { gql } from "@apollo/client";

export const SOLVES_FOR_USER = gql`
  query {
    solves {
      id
      puzzle
      scramble
      time
    }
  }
`;