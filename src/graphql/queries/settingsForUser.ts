import { gql } from "@apollo/client";

export const SETTINGS_FOR_USER = gql`
  query SettingsForUser {
    settingsForUser {
      defaultClassicMode
    }
  }
`;
