import React, { Component } from 'react'

import routes from './routes'
import GenerateRoutes from '../components/GenerateRoutes'
import withLayout from '../hoc/withLayout'

import 'sanitize.css'
import '../assets/styles/styles.css'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 */
class Applications extends Component {
  render() {
    return <GenerateRoutes routes={routes} />
  }
}
export default withLayout(Applications)
