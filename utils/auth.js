import { Component } from 'react'
import Router from 'next/router'
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
import Amplify, { Auth } from 'aws-amplify';

let awsconfig = {
  // aws_project_region: serverRuntimeConfig.awsProjectRegion,
  // aws_cognito_identity_pool_id: serverRuntimeConfig.aws_cognito_identity_pool_id,
  // aws_cognito_region: serverRuntimeConfig.aws_cognito_region,
  // aws_user_pools_id: serverRuntimeConfig.aws_user_pools_id,
  // aws_user_pools_web_client_id: serverRuntimeConfig.aws_user_pools_web_client_id,
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}
}

console.log(awsconfig)
Amplify.configure(awsconfig);

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
        this.setState({user: user, authState: 'signedIn'});
      }).catch(e => {
        console.log(e);
        this.setState({authState: 'signIn'});
        Router.push('/')
      });
    }

    render () {
      const { authState } = this.state;

      if(authState === 'signedIn') {
        const user = {
          given_name: this.state.user.attributes['given_name'],
          family_name: this.state.user.attributes['family_name'],
          locale: this.state.user.attributes['locale'],
          phone_number: this.state.user.attributes['phone_number'],
          email: this.state.user.attributes['email'],
          picture: this.state.user.attributes['picture'],
          client_id: this.state.user.attributes['custom:client_id'],
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


export {signOut, signIn, completeNewPassword, withAuthSync, ClientContext}
