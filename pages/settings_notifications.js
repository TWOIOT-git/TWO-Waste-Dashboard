import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import { withAuthSync, ClientContext } from '../utils/auth'

const SettingsNotifications = () => {
  return (
    <LayoutMenuNavegation>
      <Head title="lidbot - Settings Notifications" />
      <SettingLayout>
        <SwitchItem
          title="Push Notifications"
          description="Allow browser to send ad-hoc notifications"
          active
        />
        <SwitchItem
          title="E-mail Notifications"
          description="Weekly analytics update send via E-mail"
          active={false}
        />
        <SwitchItem
          title="Regular Events"
          description="Remind me on regular planned events"
          active
        />
        <SwitchItem
          title="Sudden Alerts"
          description="Alarm notifications on sudden errors"
          active={false}
        />
      </SettingLayout>
    </LayoutMenuNavegation>
  );
};

export default withAuthSync(SettingsNotifications)
