import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import GrowthChart from '../../components/GrowthChart';

export default class Dashboard extends Component {
  state = {
    data: [
      {
        currency: 7222,
        otherValue: 2003,
        porcentage: '+4.1%'
      },
      {
        currency: 8600,
        otherValue: 5003,
        porcentage: '+1.1%'
      },
      {
        currency: 7600,
        otherValue: 3003,
        porcentage: '+2.1%'
      },
      {
        currency: 9600,
        otherValue: 1003,
        porcentage: '+3.1%'
      },
      {
        currency: 6222,
        otherValue: 2003,
        porcentage: '+4.1%'
      },
      {
        currency: 4222,
        otherValue: 3003,
        porcentage: '+5.1%'
      },
      {
        currency: 6200,
        otherValue: 2003,
        porcentage: '+6.1%'
      },
      {
        currency: 7341,
        otherValue: 2003,
        porcentage: '+7.1%'
      },
      {
        currency: 5353,
        otherValue: 5003,
        porcentage: '+8.1%'
      },
      {
        currency: 3200,
        otherValue: 2003,
        porcentage: '+9.1%'
      },
      {
        currency: 4432,
        otherValue: 3003,
        porcentage: '+56.3%'
      },
      {
        currency: 9000,
        otherValue: 2003,
        porcentage: '+52.12%'
      },
      {
        currency: 4500,
        otherValue: 2003,
        porcentage: '+12.1%'
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col md={3}>
              <h1>Waste Bags</h1>
              <h2>384</h2>
            </Col>
            <Col md={9}>
              <GrowthChart data={this.state.data} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}
