import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import colors from '../../shared/colorPalette'

const NavLinkCustom = ({ children, to, exact }) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      style={{
        textDecoration: 'none'
      }}
      activeStyle={{
        color: colors.orange.main
      }}
    >
      {children}
    </NavLink>
  )
}

NavLinkCustom.propTypes = {
  children: PropTypes.node.isRequired
}

export default NavLinkCustom