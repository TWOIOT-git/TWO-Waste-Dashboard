import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";

const SettingsGenerals = () => {
  return (
    <LayoutMenuNavegation>
      <Head title="lidbot - Settings Generals" />
      <SettingLayout>
        <SwitchItem
          title="Language"
          description="Choose your language for lidbot.analytics"
          active
        />
        <SwitchItem
          title="Location Info"
          description="Allow 3rd party to use geo location information"
          active={false}
        />
      </SettingLayout>
    </LayoutMenuNavegation>
  );
};

export default SettingsGenerals;
