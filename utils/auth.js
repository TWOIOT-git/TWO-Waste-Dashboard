import { Component } from 'react'
import Router from 'next/router'
import { i18n, withTranslation } from '../i18n'
import moment from "moment"
import 'moment-timezone'
// import config from "../src/aws-exports"

import {determineTimezone, determineLanguage} from '../utils/locale'


import Amplify, { Auth } from 'aws-amplify'

if(process.env.NODE_ENV !== "production") {
  // console.log('prod')
  Amplify.configure({
    aws_project_region: process.env.AWS_PROJECT_REGION,
    aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.AWS_COGNITO_REGION,
    aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
    aws_appsync_graphqlEndpoint: process.env.AWS_APPSYNC_GRAPHQLENDPOINT,
    aws_appsync_region: process.env.AWS_APPSYNC_REGION,
    aws_appsync_authenticationType: process.env.AWS_APPSYNC_AUTHENTICATIONTYPE,
    aws_appsync_apiKey: process.env.AWS_APPSYNC_APIKEY,
  })
} else {
  // console.log('dev')
  // Amplify.configure(config)
}

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
      authState: err.code,
      authError: err.message
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
      },
    })

    console.log(user)

    return {
      user: user,
      authState: 'CONFIRM_CODE',
    }
  } catch (e) {
    console.log(e)

    return {
      authCode: e.code,
      authMessage: e.message
    }
  }
}

async function confirmSignUp(username, password, code) {
  try {
    let data = await Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    })

    console.log('sign up confirmed: ', data)
    signIn(username, password)
  } catch (e) {
    console.log(e)

    return {
      authCode: e.code,
      authMessage: e.message
    }
  }
}

async function resendSignUp(username) {
  try {
    let data = await Auth.resendSignUp(username)
    console.log('code resent successfully: ', data);

    return {
      authCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      authCode: e.code,
      authMessage: e.message
    }
  }
}

async function forgotPassword(username) {
  try {
    let data = await Auth.forgotPassword(username)
    console.log(data);

    return {
      authCode: 'CodeResentSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      authCode: e.code,
      authMessage: e.message
    }
  }
}
async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    let data = await Auth.forgotPasswordSubmit(username, code, newPassword)
    console.log(data);

    return {
      authCode: 'PasswordChangedSuccessfully'
    }
  } catch (e) {
    console.log(e)

    return {
      authCode: e.code,
      authMessage: e.message
    }
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
  console.log(`updateUserAttributes: ${attributes}`)
  let user = await Auth.currentAuthenticatedUser()
  let result = await Auth.updateUserAttributes(user, attributes)
  console.log(result)
  reloadUserContext()
  return result
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
  forgotPassword,
  forgotPasswordSubmit,
  updateUserAttributes,
  changePassword
}
