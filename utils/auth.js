import { Component } from 'react'
import Router from 'next/router'

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

function signOut(e) {
  e.preventDefault();
  console.log('signOut was clicked.');

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


export {signOut, withAuthSync, ClientContext}
