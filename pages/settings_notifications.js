import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import { withAuthSync, ClientContext } from '../utils/auth'
import { ServiceWorker } from 'aws-amplify';
const serviceWorker = new ServiceWorker();

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class SettingsNotifications extends React.Component {
  constructor(props) {
    super(props);

    let pushNotifications = {}

    if (Notification.permission === 'denied') {
      pushNotifications.description = 'You\'ve disallowed notifications in your browser. You\'ll need to open your browser preferences to change that.';
      pushNotifications.disabled = true;
      pushNotifications.active = false;
    } else {
      pushNotifications.description = 'Allow browser to send ad-hoc notifications';
      pushNotifications.disabled = false;
      pushNotifications.active = false;
    }

    this.state = {
      pushNotifications: pushNotifications,
      emailNotifications: false,
      regularEvents: false,
      suddenAlerts: false,
    };

    this.swRegistration = null;
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      let that = this;
      serviceWorker.register('/sw.js', '/')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);
          that.swRegistration = swReg;
          that.subsribe();
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }

  subsribe() {
    const applicationServerPublicKey = process.env.PUSH_NOTIFICATIONS_PUBLIC_KEY;
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

    let that = this;
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    }).then(function(subscription) {
      console.log('User is subscribed.');

      that.updateSubscriptionOnServer(subscription);

      that.setState(prevState => ({
        pushNotifications: {
          ...prevState.pushNotifications,
          active: true
        }
      }));
    })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
      });
  }
  unsubscribeUser() {
    let that = this;
    this.swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(function(error) {
        console.log('Error unsubscribing', error);
      })
      .then(function() {
        that.updateSubscriptionOnServer(null);

        console.log('User is unsubscribed.');
        that.setState(prevState => ({
          pushNotifications: {
            ...prevState.pushNotifications,
            active: false
          }
        }));
      });
  }
  updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    console.log(JSON.stringify(subscription))
  }

  handleClick(state) {
    if(state.pushNotifications) {

      if(state.pushNotifications.active === true) {
        this.registerServiceWorker();
      } else {
        this.unsubscribeUser();
      }

    } else {
      this.setState(prevState => ({
        emailNotifications: (state.emailNotifications !== undefined) ? state.emailNotifications : this.state.emailNotifications,
        regularEvents: (state.regularEvents !== undefined) ? state.regularEvents : this.state.regularEvents,
        suddenAlerts: (state.suddenAlerts !== undefined) ? state.suddenAlerts : this.state.suddenAlerts,
      }))
    }
  }

  render() {
    const { pushNotifications, emailNotifications, regularEvents, suddenAlerts } = this.state;

    return (
      <LayoutMenuNavegation>
        <Head title="lidbot - Settings Notifications"/>
        <SettingLayout>
          <SwitchItem
            title="Push Notifications"
            description={pushNotifications.description}
            active={pushNotifications.active}
            disabled={pushNotifications.disabled}
            onClick={(active) => this.handleClick({pushNotifications: {active}})}
          />
          <SwitchItem
            title="E-mail Notifications"
            description="Weekly analytics update send via E-mail"
            active={emailNotifications}
            onClick={(active) => this.handleClick({emailNotifications: active})}
          />
          <SwitchItem
            title="Regular Events"
            description="Remind me on regular planned events"
            active={regularEvents}
            onClick={(active) => this.handleClick({regularEvents: active})}
          />
          <SwitchItem
            title="Sudden Alerts"
            description="Alarm notifications on sudden errors"
            active={suddenAlerts}
            onClick={(active) => this.handleClick({suddenAlerts: active})}
          />
        </SettingLayout>
      </LayoutMenuNavegation>
    )
  };
};

export default withAuthSync(SettingsNotifications)
