import React, { Component } from 'react'
import MenuComplexNavegation from '../../components/MenuComplexNavegation'
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
            {/* <FixedNavBar pageWrapId={"Layout-content-wrapper"} /> */}
          </Visible>
          <div className="Layout-content-wrapper" id="Layout-content-wrapper">
            <WrappedComponent {...this.props} />
          </div>
        </main>
      )
    }
  }

  return Layout
}

export default withLayout
