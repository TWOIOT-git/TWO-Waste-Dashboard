import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import { updateUserAttributes, withAuthSync, reloadUserContext, ClientContext } from '../utils/auth'
import { Logger, Auth, ServiceWorker } from 'aws-amplify';
import { withTranslation } from '../i18n'
import { toast } from 'react-toastify'
const serviceWorker = new ServiceWorker();
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import fetch from "isomorphic-unfetch";

import './main.scss'

const logger = new Logger('SettingsNotifications');


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

  static async getInitialProps({req}) {
    return {
      namespacesRequired: ['settings'],
    }
  }

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
      mobileNotifications: false,
      customer: null
    };

    this.swRegistration = null;
    this.registerServiceWorker();
  }

  async componentDidMount() {
    let pushNotifications = this.context.user.attributes['custom:push_notifications']
    let emailNotifications = this.context.user.attributes['custom:email_notifications']
    let mobileNotifications = this.context.user.attributes['custom:mobile_notifications']

    const user = await Auth.currentAuthenticatedUser()
    const url = process.env.DEVICE_API + "customers/" + user.attributes['custom:client_id']
    const response = await fetch(url);
    const customer = await response.json();

    this.setState(prevState => ({
      pushNotifications: {
        ...prevState.pushNotifications,
        active: (pushNotifications !== undefined) ? pushNotifications : false
      },
      emailNotifications: (emailNotifications !== undefined) ? emailNotifications : false,
      mobileNotifications: (mobileNotifications !== undefined) ? mobileNotifications : false,
      customer: customer
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
    const title = 'Lidbot';
    const options = {
      body: "Notifications Enabled",
      icon: 'static/favicons/apple-icon.png',
      badge: 'static/favicons/apple-icon.png'
    };

    this.swRegistration.showNotification(title, options);
  }

  subscribe() {
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

  async handleClick(newState) {
    if(newState.pushNotifications) {

      if(newState.pushNotifications.active === true) {
        this.subscribe();
      } else {
        this.unsubscribeUser();
      }

    } else {
      let attributes = {
        'custom:email_notifications': (newState.emailNotifications !== undefined) ? newState.emailNotifications.toString() : this.state.emailNotifications.toString(),
        'custom:mobile_notifications': (newState.mobileNotifications !== undefined) ? newState.mobileNotifications.toString() : this.state.mobileNotifications.toString(),
      }

      const state = await updateUserAttributes(attributes)

      this.setState(prevState => ({
        emailNotifications: (newState.emailNotifications !== undefined) ? newState.emailNotifications : this.state.emailNotifications,
        mobileNotifications: (newState.mobileNotifications !== undefined) ? newState.mobileNotifications : this.state.mobileNotifications,
      }))

      toast(this.props.t('settings-saved'), {
        className: 'notification success'
      })
    }
  }



  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={'Lidbot - ' + this.props.t('notifications')}/>
        <SettingLayout>
          <div className="main">
            <div className="switches">
            <SwitchItem
              title={this.props.t('push-notifications')}
              description={this.state.pushNotifications.description}
              active={this.state.pushNotifications.active}
              disabled={this.state.pushNotifications.disabled}
              onClick={(active) => this.handleClick({pushNotifications: {active}})}
            />
            <SwitchItem
              title={this.props.t('email-notifications')}
              description={this.props.t('email-notifications-sub')}
              active={this.state.emailNotifications}
              onClick={(active) => this.handleClick({emailNotifications: active})}
            />
            <SwitchItem
              title={this.props.t('mobile-notifications')}
              description={this.props.t('mobile-notifications-sub')}
              active={this.state.mobileNotifications}
              onClick={(active) => this.handleClick({ mobileNotifications: active })}
            />
            </div>
          </div>
        </SettingLayout>
        <style jsx>
          {`
            .main {
            }
            .switches {
              margin-bottom: 50px;
            }
            .slider {
              font-family: Roboto;
              margin-bottom: 50px;
              
              .slider-header {
                margin-bottom: 70px;
              }
              .slider-label {
                display: block;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                color: #333333;
                margin-bottom: 50px;
              }
              .settings-header {
                display: block;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                color: #333333;
                margin-bottom: 15px;
              }
              .settings-sub {
                margin-bottom: 5px;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                color: #000000;
                opacity: 0.5;
                display: block;
              }
            }
          `}
        </style>
      </LayoutMenuNavegation>
    )
  };
};

export default withTranslation('settings')(withAuthSync(SettingsNotifications))
