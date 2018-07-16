import React, { Component } from 'react'
import MenuComplexNavegation from '../../components/MenuComplexNavegation'
import HeaderSearch from '../../components/HeaderSearch'
import { Hidden, Visible } from 'react-grid-system'
import './styles.css'

const withLayout = WrappedComponent => {
  class Layout extends Component {
    render() {
      return (
        <main className="Layout-wrapper">
          <Hidden md sm xs>
            <MenuComplexNavegation />
          </Hidden>
          <Visible md sm xs>
            <MenuComplexNavegation />
          </Visible>
          <div className="Layout-content-wrapper">
            <HeaderSearch />
            <div className="Layout-content-main">
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </main>
      )
    }
  }

  return Layout
}

export default withLayout
