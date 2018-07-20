import React, { Component } from 'react'
import routes from './routes'
import GenerateRoutes from '../components/GenerateRoutes'
import { MuiThemeProvider } from '@material-ui/core'
import theme from './theme'

import 'sanitize.css'
import '../assets/styles/styles.css'


/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 */
class Applications extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <GenerateRoutes routes={routes} />
      </MuiThemeProvider>
    )
  }
}

export default Applications
