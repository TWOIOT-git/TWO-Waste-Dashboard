import React, { Component } from 'react'
import routes from './routes'
import GenerateRoutes from '../components/GenerateRoutes'
import PropTypes from 'prop-types'
import { setConfiguration } from 'react-grid-system'

import 'sanitize.css'
import '../assets/styles/styles.css'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 */
class Applications extends Component {
  componentDidMount = () => {
    setConfiguration({
      defaultScreenClass: this.props.defaultScreenClass
    })
  }


  static propTypes = {
    defaultScreenClass: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  }

  static defaultProps = {
    defaultScreenClass: 'xl'
  }

  render() {
    return (
      <GenerateRoutes routes={routes} />
    )
  }
}

export default Applications