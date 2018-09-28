import React from 'react'
import { UserConsumer } from '../../providers/UserProvider'

export default (WrappedComponent) => {
  const withUserInformation = props => (
    <UserConsumer>
      {value => (
        <WrappedComponent
          {...props}
          {...value}
        />
      )}
    </UserConsumer>
  )

  return withUserInformation
}