import React, { Component } from 'react'
import MenuComplexNavegation from '../../components/MenuComplexNavegation'
import HeaderSearch from '../../components/HeaderSearch'
import { Hidden, Visible } from 'react-grid-system'
// import NotificationDrawer from '../../components/NotificationDrawer';
import './styles.css'

const withLayout = WrappedComponent => {
  class Layout extends Component {
    state = {
      showNotificationDrawer: true
    }

    handleToggleDrawerNotification = () => this.setState(prevState => {
      return { showNotificationDrawer: !prevState.showNotificationDrawer }
    })

    render() {
      return (
        <main className="Layout-wrapper">
          {/*
            <NotificationDrawer
            show={this.state.showNotificationDrawer}
            onClose={this.handleToggleDrawerNotification}
            />
          */}
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
