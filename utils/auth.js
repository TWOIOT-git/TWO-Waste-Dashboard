import { Component } from 'react'
import Router from 'next/router'
import { i18n, withTranslation } from '../i18n'
import moment from "moment"
import 'moment-timezone'
import uuid from 'uuid/v1'

import {determineTimezone, determineLanguage} from '../utils/locale'

import Amplify, { Auth, Storage, Logger } from 'aws-amplify'

Amplify.Logger.LOG_LEVEL = 'DEBUG';
const logger = new Logger('auth');

Amplify.configure({
  Auth: {
    identityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    region: process.env.AWS_PROJECT_REGION,
    userPoolId: process.env.AWS_USER_POOLS_ID,
    userPoolWebClientId: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      bucket: process.env.AWS_USER_FILES_S3_BUCKET,
      region: process.env.AWS_USER_FILES_S3_BUCKET_REGION,
    }
  }
});

function signOut(e) {
  e.preventDefault()

  Auth.signOut()
    .then(data => {
      console.log('Sign out successful')
      console.log(data)
      Router.push('/')
    })
    .catch(err => {
      console.log('Sign out error: ')
      console.log(err)
    })
}
function changePassword(oldPassword, newPassword) {
  Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, oldPassword, newPassword)
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
async function completeNewPassword(user, password) {
  const loggedUser = await Auth.completeNewPassword(
    user,
    password,
  )
  console.log(loggedUser)
  Router.push('/analytics')
}
async function signIn(email, password) {
  try {
    const user = await Auth.signIn(email, password)

    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      return {user: user, authState: user.challengeName, authError: 'Please change your password.'}
    } else {
      Router.push('/analytics')
    }

  } catch (err) {
    console.log('Error while signing in: ', err)

    return {
      errorAuthCode: e.code
    }
  }
}

async function signUp(email, password) {
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

    console.log(user)

    return {
      user: user,
      authState: 'CONFIRM_CODE',
      successAuthCode: 'VerificationCodeSent'
    }
  } catch (e) {
    console.log(e)

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
    console.log(e)

    return {
      successAuthCode: null,
      errorAuthCode: e.code
    }
  }
}

async function resendSignUp(username) {
  try {
    let data = await Auth.resendSignUp(username)
    console.log('code resent successfully: ', data);

    return {
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function forgotPassword(username) {
  try {
    let data = await Auth.forgotPassword(username)
    console.log(data);

    return {
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: e.code
    }
  }
}
async function verifyCurrentUserAttribute(attr) {
  try {
    let data = await Auth.verifyCurrentUserAttribute(attr)
    console.log(data);

    return {
      successAuthCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: e.code
    }
  }
}
async function verifyCurrentUserAttributeSubmit(attr, code) {
  try {
    let data = await Auth.verifyCurrentUserAttributeSubmit(attr, code)

    console.log(data);

    let user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    })

    return {
      successAuthCode: true,
      email_verified: user.attributes.email_verified,
      phone_number_verified: user.attributes.phone_number_verified,
    }
  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: true
    }
  }
}

async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    let data = await Auth.forgotPasswordSubmit(username, code, newPassword)
    console.log(data);

    return {
      successAuthCode: 'PasswordChangedSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: e.code
    }
  }
}

async function getUserImage(key) {
  if(!key) {
    throw 'key param not found'
  }

  let result = await Storage.get(key, {
    level: 'private'
  })

  logger.debug('getUserImage: ', result)

  return result
}
function removeUserImage(key) {
  if(key) {
    Storage.remove(key, {level: 'private'})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

function reloadUserContext() {
  console.log('reloadUserContext')
  Auth.currentAuthenticatedUser({
    bypassCache: true
  }).then(user => {
    console.log(user)
  }).catch(e => {
    console.log(e)
  })
}

async function updateUserAttributes(attributes) {
  try {
    let user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    })
    let result = await Auth.updateUserAttributes(user, attributes)

    console.log(result)

    reloadUserContext()

  } catch (e) {
    console.log(e)

    return {
      errorAuthCode: e.code
    }
  }
}

const ClientContext = React.createContext('')

function withAuthSync(WrappedComponent) {
  return class extends Component {
    static async getInitialProps (ctx) {
      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
      console.log('@auth getInitialProps: ', pageProps)
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
        console.log('Current user: ', user)

        let language = determineLanguage(user).value

        if(language) {
          console.log(`setting language to: ${language}`)
          i18n.changeLanguage(language)
          moment.locale(language)
        }

        let timezone = determineTimezone(user).value

        if(timezone) {
          console.log(`setting timezone to: ${timezone}`)
          moment.tz.setDefault(timezone)
        }

        this.setState({user: user, authState: 'signedIn'})
      }).catch(e => {
        console.log(e)
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
            <WrappedComponent
              customerId={this.state.user.attributes['custom:client_id']}
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
