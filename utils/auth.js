import { Component } from 'react'
import Router from 'next/router'
import { i18n, withTranslation } from '../i18n'
import moment from "moment"
import 'moment-timezone'
import uuid from 'uuid/v1'
import { ToastContainer } from 'react-toastify'
import {determineTimezone, determineLanguage} from '../utils/locale'
import Amplify, { Auth, Storage, Logger } from 'aws-amplify'

import 'react-toastify/dist/ReactToastify.min.css';

Amplify.Logger.LOG_LEVEL = 'DEBUG';
const logger = new Logger('auth');

logger.debug('process.env.identityPoolId: ', process.env.identityPoolId)
logger.debug('process.env.userPoolId: ', process.env.userPoolId)

Amplify.configure({
  Auth: {
    identityPoolId: process.env.identityPoolId,
    region: 'ap-northeast-1',
    userPoolId: process.env.userPoolId,
    userPoolWebClientId: process.env.userPoolWebClientId,
  },
  Storage: {
    AWSS3: {
      bucket: 'lidbot-dev',
      region: 'ap-northeast-1',
    }
  },
  API: {
    endpoints: [
      {
        name: "lidbotAPI",
        endpoint: process.env.api,
        custom_header: async () => {
          return {
            Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
          }
        }
      }
    ]
  }
})

function signOut(e) {
  e.preventDefault()

  Auth.signOut()
    .then(data => {
      logger.debug('Sign out successful')
      logger.debug(data)
      Router.push('/')
    })
    .catch(err => {
      logger.debug('Sign out error: ')
      logger.debug(err)
    })
}
async function changePassword(oldPassword, newPassword) {
  if(!oldPassword) {
    return {
      errorAuthCode: "NoOldPassword",
    }
  }

  if(!newPassword) {
    return {
      errorAuthCode: "NoNewPassword",
    }
  }

  try {
    let user = await Auth.currentAuthenticatedUser()
    let response = await Auth.changePassword(user, oldPassword, newPassword)

    logger.debug('Auth.changePassword response: ', response)

    return {
      successAuthCode: true,
      errorAuthCode: false
    }
  } catch (e) {
    return {
      errorAuthCode: e.code
    }
  }
}
async function completeNewPassword(user, password) {
  try {
    let result = await Auth.completeNewPassword(user, password)
    logger.debug(result)

    return {
      successAuthCode: 'PasswordChangedSuccessfully'
    }
  } catch (e) {
    logger.error(e)

    return {
      errorAuthCode: e.code
    }
  }
}
async function signIn(email, password) {
  if(!email) {
    return {
      errorAuthCode: "NoEmail",
    }
  }

  if(!password) {
    return {
      errorAuthCode: "NoPassword",
    }
  }

  try {
    const user = await Auth.signIn(email, password)

    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      return {user: user, authState: user.challengeName, authError: 'Please change your password.'}
    } else {
      Router.push('/sensors')
    }

  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function signUp(email, password) {
  if(!email) {
    return {
      errorAuthCode: "NoEmail",
    }
  }

  if(!password) {
    return {
      errorAuthCode: "NoPassword",
    }
  }

  try {
    let user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        'custom:language': determineLanguage().value,
        'custom:client_id': uuid()
      },
    })

    logger.debug(user)

    return {
      user: user,
      authState: 'CONFIRM_CODE',
      successAuthCode: 'VerificationCodeSent'
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function confirmSignUp(username, code) {
  try {
    let data = await Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    })

    return {
      successAuthCode: 'VerificationCodeSent'
    }
  } catch (e) {
    logger.debug(e)

    return {
      successAuthCode: null,
      errorAuthCode: e.code
    }
  }
}

async function resendSignUp(username) {
  if(!username) {
    return {
      errorAuthCode: "NoEmail",
    }
  }

  try {
    let data = await Auth.resendSignUp(username)
    logger.debug('code resent successfully: ', data);

    return {
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function forgotPassword(username) {
  if(!username) {
    return {
      errorAuthCode: "NoEmail",
    }
  }

  try {
    let data = await Auth.forgotPassword(username)
    logger.debug(data);

    return {
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}
async function verifyCurrentUserAttribute(attr) {
  try {
    let data = await Auth.verifyCurrentUserAttribute(attr)
    logger.debug(data);

    return {
      errorAuthCode: null,
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}
async function verifyCurrentUserAttributeSubmit(attr, code) {
  try {
    let data = await Auth.verifyCurrentUserAttributeSubmit(attr, code)

    let user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    })

    return {
      successAuthCode: true,
      email_verified: user.attributes.email_verified,
      phone_number_verified: user.attributes.phone_number_verified,
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: true
    }
  }
}

async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    let data = await Auth.forgotPasswordSubmit(username, code, newPassword)
    logger.debug(data);

    return {
      successAuthCode: 'PasswordChangedSuccessfully'
    }
  } catch (e) {
    logger.debug(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function getUserImage(key) {
  if(!key) {
    return null
  }

  let result = await Storage.get(key)

  logger.debug('getUserImage: ', result)

  logger.debug('getUserImage: ', result)

  return result
}
function removeUserImage(key) {
  if(key) {
    Storage.remove(key)
      .then(result => logger.debug(result))
      .catch(err => logger.debug(err));
  }
}

function reloadUserContext() {
  logger.debug('reloadUserContext')
  Auth.currentAuthenticatedUser({
    bypassCache: true
  }).then(user => {
    logger.debug(user)
  }).catch(e => {
    logger.debug(e)
  })
}

async function updateUserAttributes(attributes) {
  let user = await Auth.currentAuthenticatedUser()
  let result = await Auth.updateUserAttributes(user, attributes)

  await Auth.currentAuthenticatedUser( {
    bypassCache: true
  })

  return {
    successAuthCode: 'SettingsSaved'
  }
}

const ClientContext = React.createContext('')

function withAuthSync(WrappedComponent) {
  return class extends Component {
    static async getInitialProps (ctx) {
      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
      logger.debug('@auth getInitialProps: ', pageProps)
      return { ...pageProps }
    }

    constructor (props) {
      super(props)

      this.state = {
        user: null,
        authState: 'loading',
      }
    }

    componentDidMount() {
      Auth.currentAuthenticatedUser().then(user => {
        logger.debug('Current user: ', user)

        let language = determineLanguage(user).value

        if(language) {
          logger.debug(`setting language to: ${language}`)
          i18n.changeLanguage(language)
          moment.locale(language)
        }

        let timezone = determineTimezone(user).value

        if(timezone) {
          logger.debug(`setting timezone to: ${timezone}`)
          moment.tz.setDefault(timezone)
        }

        this.setState({user: user, authState: 'signedIn'})
      }).catch(e => {
        logger.debug(e)
        Router.push('/')
      })
    }

    render () {
      const { authState } = this.state

      if(authState === 'signedIn') {
        return (
          <ClientContext.Provider value={
            {
              user: this.state.user
            }}
          >
            <ToastContainer
              autoClose={2000}
              progressClassName={"progress"}
            />
            <WrappedComponent
              customerId={this.state.user.attributes['custom:client_id']}
              user_attributes={this.state.user.attributes}
              {...this.props}
            />
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
  signUp,
  confirmSignUp,
  resendSignUp,
  getUserImage,
  removeUserImage,
  forgotPassword,
  verifyCurrentUserAttribute,
  verifyCurrentUserAttributeSubmit,
  forgotPasswordSubmit,
  updateUserAttributes,
  changePassword
}
