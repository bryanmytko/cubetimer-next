import { gql } from "@apollo/client";

export const SETTINGS_FOR_USER = gql`
  query SettingsForUser($userId: String!) {
    settingsForUser(userId: $userId) {
      defaultClassicMode
    }
  }
`;
