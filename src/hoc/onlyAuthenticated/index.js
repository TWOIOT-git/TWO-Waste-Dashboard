import React from 'react'
import PropTypes from 'prop-types'
import { UserConsumer } from '../../providers/UserProvider';
import { Redirect } from 'react-router-dom';

export default (WrappedComponent) => {
  const OnlyAuthenticated = ({ ...props }) => {
    return (
      <UserConsumer>
        {
          value => value.user.isAuthenticated() ? (
            <WrappedComponent
              {...props}
              {...value}
            />
          ) : (() => {
            return <Redirect to='/auth' />
          })()
        }
      </UserConsumer>
    )
  }

  OnlyAuthenticated.propTypes = {
    user: PropTypes.object,
  }

  return OnlyAuthenticated
}