import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import { withAuthSync, reloadUserContext, ClientContext } from '../utils/auth'
import { Auth, ServiceWorker } from 'aws-amplify';
import { withTranslation } from '../i18n'
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
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['settings'],
  })

  constructor(props) {
    super(props);

    let pushNotifications = {}

    if (Notification.permission === 'denied') {
      pushNotifications.description = this.props.t('push-notifications-blocked');
      pushNotifications.disabled = true;
      pushNotifications.active = false;
    } else {
      pushNotifications.description = this.props.t('push-notifications-sub');
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
    this.registerServiceWorker();
  }

  componentDidMount() {
    let pushNotifications = this.context.user.attributes['custom:push_notifications']
    let emailNotifications = this.context.user.attributes['custom:email_notifications']
    let regularEvents = this.context.user.attributes['custom:regular_events']
    let suddenAlerts = this.context.user.attributes['custom:sudden_alerts']

    this.setState(prevState => ({
      pushNotifications: {
        ...prevState.pushNotifications,
        active: (pushNotifications !== undefined) ? pushNotifications : false
      },
      emailNotifications: (emailNotifications !== undefined) ? emailNotifications : false,
      regularEvents: (regularEvents !== undefined) ? regularEvents : false,
      suddenAlerts: (suddenAlerts !== undefined) ? suddenAlerts : false,
    }))
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      let that = this;
      serviceWorker.register('/sw.js', '/')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);
          that.swRegistration = swReg;
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }

  showConfirmation() {
    const title = 'lidbot';
    const options = {
      body: "Notifications Enabled",
      icon: 'static/favicons/apple-icon.png',
      badge: 'static/favicons/apple-icon.png'
    };

    this.swRegistration.showNotification(title, options);
  }

  subsribe() {
    const applicationServerPublicKey = process.env.PUSH_NOTIFICATIONS_PUBLIC_KEY;
    console.log(`applicationServerPublicKey ${applicationServerPublicKey}`)
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

      that.showConfirmation();
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
    console.log(JSON.stringify(subscription))
    Auth.updateUserAttributes(this.context.user, {
      'custom:push_notifications': (subscription) ? "true" : "false",
      'custom:push_subscription': (subscription) ? JSON.stringify(subscription) : null,
    })
      .then(function (result) {
        console.log(result)
        reloadUserContext();
      })
  }

  handleClick(newState) {
    if(newState.pushNotifications) {

      if(newState.pushNotifications.active === true) {
        this.subsribe();
      } else {
        this.unsubscribeUser();
      }

    } else {
      this.setState(prevState => ({
        emailNotifications: (newState.emailNotifications !== undefined) ? newState.emailNotifications : this.state.emailNotifications,
        regularEvents: (newState.regularEvents !== undefined) ? newState.regularEvents : this.state.regularEvents,
        suddenAlerts: (newState.suddenAlerts !== undefined) ? newState.suddenAlerts : this.state.suddenAlerts,
      }))

      Auth.updateUserAttributes(this.context.user, {
        'custom:email_notifications': (newState.emailNotifications !== undefined) ? newState.emailNotifications.toString() : this.state.emailNotifications.toString(),
        'custom:regular_events': (newState.regularEvents !== undefined) ? newState.regularEvents.toString() : this.state.regularEvents.toString(),
        'custom:sudden_alerts': (newState.suddenAlerts !== undefined) ? newState.suddenAlerts.toString() : this.state.suddenAlerts.toString(),
      })
        .then(function (result) {
          console.log(result)
          reloadUserContext();
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  }

  render() {
    const { pushNotifications, emailNotifications, regularEvents, suddenAlerts } = this.state;

    return (
      <LayoutMenuNavegation>
        <Head title={'lidbot - ' + this.props.t('notifications')}/>
        <SettingLayout>
          <SwitchItem
            title={this.props.t('push-notifications')}
            description={pushNotifications.description}
            active={pushNotifications.active}
            disabled={pushNotifications.disabled}
            onClick={(active) => this.handleClick({pushNotifications: {active}})}
          />
          <SwitchItem
            title={this.props.t('email-notifications')}
            description={this.props.t('email-notifications-sub')}
            active={emailNotifications}
            onClick={(active) => this.handleClick({emailNotifications: active})}
          />
          <SwitchItem
            title={this.props.t('regular-events')}
            description={this.props.t('regular-events-sub')}
            active={regularEvents}
            onClick={(active) => this.handleClick({regularEvents: active})}
          />
          <SwitchItem
            title={this.props.t('sudden-alerts')}
            description={this.props.t('sudden-alerts-sub')}
            active={suddenAlerts}
            onClick={(active) => this.handleClick({suddenAlerts: active})}
          />
        </SettingLayout>
      </LayoutMenuNavegation>
    )
  };
};

export default withTranslation('settings')(withAuthSync(SettingsNotifications))
