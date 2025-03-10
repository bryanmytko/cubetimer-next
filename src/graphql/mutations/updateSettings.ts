import { gql } from "@apollo/client";

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($userId: String!, $defaultClassicMode: Boolean) {
    updateSettings(userId: $userId, defaultClassicMode: $defaultClassicMode) {
      defaultClassicMode
    }
  }
`;
