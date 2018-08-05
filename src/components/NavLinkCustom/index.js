import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

const NavLinkCustom = ({ children, to, exact }) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      style={{
        textDecoration: 'none'
      }}
      activeStyle={{
        color: '#FF6B00'
      }}
    >
      {children}
    </NavLink>
  )
}

NavLinkCustom.propTypes = {
  children: PropTypes.number.isRequired
}

export default NavLinkCustom