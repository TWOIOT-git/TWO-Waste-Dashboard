import React from 'react'
import PropTypes from 'prop-types'

const UserContext = React.createContext()

const UserConsumer = UserContext.Consumer

class UserProvider extends React.Component {
  state = {
    currentUser: null,
    isAuthenticated: () => this.state.currentUser !== null,
    authentication: ({ email, password }) => {
      return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAWAEvqeUBKzcWYAGs-KlAz0VE3tNJU6h4', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": 'application/json',
        }
      }).then(res => {
        return res.json()
      }).then(res => {
        console.log(res)
        if ('error' in res) {
          return false
        } else {
          const expirationDate = new Date(new Date().getTime() + res.expiresIn * 1000);

          localStorage.setItem("token", res.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", res.localId);
          localStorage.setItem("email", res.email);

          this.checkAuthTimeout = setTimeout(() => {
            this.state.logout()
          }, res.expiresIn * 1000);

          this.setState({
            currentUser: {
              email: res.email
            }
          })
          return true
        }
      }).catch(err => {
        console.log(err)
        return false
      })
    },
    logout: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("expirationDate")
      localStorage.removeItem("userId")
      localStorage.removeItem("email")
      this.checkAuthTimeout && clearTimeout(this.checkAuthTimeout)
      this.setState({ currentUser: null })
    },
    getUserInformation: (callbackSuccess, callbackFail) => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const email = localStorage.getItem("email")

      let expirationDate = localStorage.getItem("expirationDate")

      console.log(token, expirationDate, userId, email)

      if (token && expirationDate && userId && email) {
        expirationDate = new Date(expirationDate)

        if (expirationDate <= new Date()) {
          this.logout()
          callbackFail()
        } else {
          this.checkAuthTimeout = setTimeout(() => {
            this.state.logout()
          }, ((expirationDate.getTime() - new Date().getTime()) / 1000) * 1000);
          this.setState({
            currentUser: {
              email: email
            }
          }, () => callbackSuccess())
        }
      } else {
        callbackFail()
      }
    }
  }

  componentWillUnmount = () => {
    this.checkAuthTimeout && clearTimeout(this.checkAuthTimeout)
  }

  render() {
    const context = { ...this.state }
    return (
      <UserContext.Provider value={{ user: context }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
}

export {
  UserConsumer,
  UserProvider
}