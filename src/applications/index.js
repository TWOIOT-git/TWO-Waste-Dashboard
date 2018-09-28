import React, { Component } from 'react'
import routes from './routes'
import GenerateRoutes from '../components/GenerateRoutes'
import PropTypes from 'prop-types'
import { setConfiguration } from 'react-grid-system'
import { withRouter } from 'react-router-dom';
import withUserInformation from '../hoc/withUserInformation';

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

    this.props.user.getUserInformation(
      () => {
        this.props.history.push('/realtime')
      },
      () => {
        this.props.history.push('/auth')
      }
    )
  }


  static propTypes = {
    defaultScreenClass: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    user: PropTypes.object
  }

  static defaultProps = {
    defaultScreenClass: 'xl'
  }

  render() {
    return (
      <React.Fragment>
        <GenerateRoutes routes={routes} />
      </React.Fragment>
    )
  }
}

export default withUserInformation(withRouter(Applications))