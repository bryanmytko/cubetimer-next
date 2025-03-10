import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { SETTINGS_FOR_USER } from "../../graphql/queries/settingsForUser";
import { UPDATE_SETTINGS } from "../../graphql/mutations/updateSettings";
import { useMutation, useQuery } from "@apollo/client";

const Settings = () => {
  const { data: session } = useSession();
  const displayName = session ? session.user.name : "User";
  const userId = session?.user?.id;
  const { data, error, loading } = useQuery(SETTINGS_FOR_USER, {
    skip: !userId,
    variables: { userId },
  });
  const [saveSettings] = useMutation(UPDATE_SETTINGS);
  const [settings, updateSettings] = useState({
    defaultClassicMode: data?.settingsForUser?.defaultClassicMode,
  });

  useEffect(() => {
    updateSettings({
      defaultClassicMode: data?.settingsForUser?.defaultClassicMode,
    });
  }, [data]);

  if (loading) return <></>;
  if (error) return <>Something went wrong.</>;

  const toggleDefaultClassicMode = () => {
    updateSettings({ defaultClassicMode: !settings.defaultClassicMode });
    saveSettings({
      variables: { userId, defaultClassicMode: !settings.defaultClassicMode },
    });
  };

  return (
    <div className="container settings-container m-auto px-0 lg:px-0 py-6 md:py-12 w-full text-black">
      <Head>
        <title>Cubetimer.io | Settings</title>
      </Head>
      <div className="rounded-md bg-neutral-800 w-1/2 p-6">
        <h1 className="text-3xl text-cyan-400 mb-4">
          {`${displayName}'s`} Settings
        </h1>
        <div className="flex justify-end mr-1 flex-row-reverse gap-2 items-center">
          <label
            htmlFor="classicModeDefault"
            className="mr-2 cursor-pointer text-neutral-100 font-thin pt-1"
          >
            Classic Mode as default
          </label>
          <input
            id="classicModeDefault"
            type="checkbox"
            className="accent-cyan-600 scale-125 cursor-pointer"
            onChange={toggleDefaultClassicMode}
            checked={!!settings?.defaultClassicMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
