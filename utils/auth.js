import { Component } from 'react'
import Router from 'next/router'
import getConfig from 'next/config'
import { i18n } from '../i18n'
import moment from "moment";
import 'moment-timezone';
import { withTranslation } from '../i18n'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

import Amplify, { Auth } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

let awsconfig = {
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}
}

// console.log(awsconfig)
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

const analyticsConfig = {
  AWSPinpoint: {
    appId: process.env.AWS_PINPOINT_APP_ID,
    region: process.env.AWS_PINPOINT_REGION,
    mandatorySignIn: false,
  }
}

// Analytics.configure(analyticsConfig)

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

function signOut(e) {
  e.preventDefault();

  Auth.signOut()
    .then(data => {
      console.log('Sign out successful');
      console.log(data)
      Router.push('/')
    })
    .catch(err => {
      console.log('Sign out error: ');
      console.log(err)
    });
}
function changePassword(oldPassword, newPassword) {
  Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, oldPassword, newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
async function completeNewPassword(user, password) {
  const loggedUser = await Auth.completeNewPassword(
    user,
    password,
  );
  console.log(loggedUser);
  Router.push('/analytics');
}
async function signIn(email, password) {
  try {
    const user = await Auth.signIn(email, password);

    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      return {user: user, authState: user.challengeName, authError: 'Please change your password.'}
    } else {
      console.log('sign in success!')
      // Analytics.record('Andrzej-test-event');

      // Analytics.updateEndpoint({
      //   attributes: {
      //     interests: ['science', 'politics', 'travel'],
      //   },
      //   userId: user.attributes['email'],
      //   userAttributes: {
      //     username: 'ilovethecloud'
      //   }
      // });

      Router.push('/analytics')
    }

  } catch (err) {
    console.log(err)

    return {
      authState: err.code,
      authError: err.message
    }
  }
}

function reloadUserContext() {
  console.log('reloadUserContext');
  Auth.currentAuthenticatedUser({
    bypassCache: true
  }).then(user => {
    console.log(user);
  }).catch(e => {
    console.log(e);
  });
}

async function updateUserAttributes(attributes) {
  console.log(`updateUserAttributes: ${attributes}`)
  let user = await Auth.currentAuthenticatedUser()
  let result = await Auth.updateUserAttributes(user, attributes)
  console.log(result)
  reloadUserContext()
  return result
}

const ClientContext = React.createContext('');

function withAuthSync(WrappedComponent) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      console.log('@auth getInitialProps')
      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
      return { ...pageProps }
    }

    constructor (props) {
      super(props)

      this.state = {
        user: null,
        authState: 'loading',
        authData: null,
        authError: null
      }
    }

    componentDidMount() {
      Auth.currentAuthenticatedUser().then(user => {
        console.log(user);

        i18n.changeLanguage(user.attributes['custom:language'])
        moment.locale(user.attributes['custom:language']);
        moment.tz.setDefault(user.attributes['custom:timezone']);

        this.setState({user: user, authState: 'signedIn'});
      }).catch(e => {
        console.log(e);
        Router.push('/')
      });
    }

    render () {
      const { authState } = this.state;

      if(authState === 'signedIn') {
        const user = {
          user: this.state.user
        }
        const CustomerContext = React.createContext(user);

        return (
          <ClientContext.Provider value={user}>
            <WrappedComponent {...this.props} />
          </ClientContext.Provider>
          )
      } else {
        return <div />
      }
    }
  }
}



export {
  signOut, signIn, completeNewPassword, withAuthSync, ClientContext, reloadUserContext,
  updateUserAttributes,
  changePassword
}
