import { gql } from "@apollo/client";

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($defaultClassicMode: Boolean) {
    updateSettings(defaultClassicMode: $defaultClassicMode) {
      defaultClassicMode
    }
  }
`;
