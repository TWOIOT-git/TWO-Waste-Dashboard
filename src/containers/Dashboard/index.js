import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import GrowthChart from '../../components/GrowthChart'
import TextWithNumberButtom from '../../components/TextWithNumberButtom'
import FlexColumn from '../../components/FlexColumn'
import FlexItem from '../../components/FlexItem'
import ChartScaleDate from '../../components/ChartScaleDate'
import BoxNumbers from '../../components/BoxNumbers';
import ProgressChartVictoryPorcentage from '../../components/ProgressChartVictoryPorcentage';
import AverageTime from '../../components/AverageTime';
import withLayout from '../../hoc/withLayout';
import MarginTop from '../../components/MarginTop';

class Dashboard extends Component {
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
            <Col md={8} lg={5} xl={4} offset={{
              md: 4,
              lg: 7,
              xl: 8
            }}>
              <ChartScaleDate />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FlexColumn>
                <FlexItem>
                  <TextWithNumberButtom text={'Waste Bags'} number={384} />
                </FlexItem>
                <FlexItem>
                  <TextWithNumberButtom text={'Recycling  Bags'} number={198} dark={true} />
                </FlexItem>
              </FlexColumn>
            </Col>
            <Col md={9}>
              <GrowthChart data={this.state.data} />
            </Col>
          </Row>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col sm={12} md={12} lg={6} xl={6}>
              <BoxNumbers
                title="Waste Bags"
                firstNumber={384}
                firstText="Pickup Reached"
                secondNumber={145}
                secondText="Fill Level Reached"
              />
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <MarginTop>
                <BoxNumbers
                  title="Recycling Bags"
                  firstNumber={223}
                  firstText="Pickup Reached"
                  secondNumber={81}
                  secondText="Fill Level Reached"
                />
              </MarginTop>
            </Col>
          </Row>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col sm={12} md={6} lg={3} xl={3}>
              <MarginTop>
                <ProgressChartVictoryPorcentage
                  data={75}
                  paragraph={'RT Total Waste'}
                />
              </MarginTop>
            </Col>
            <Col sm={12} md={6} lg={3} xl={3}>
              <MarginTop>
                <ProgressChartVictoryPorcentage
                  data={21}
                  paragraph={'RT Total Recycling'}
                />
              </MarginTop>
            </Col>
            <Col sm={12} md={6} lg={3} xl={3}>
              <MarginTop>
                <AverageTime
                  data={'11:23'}
                  paragraph={'Average Pickup Time Waste'}
                />
              </MarginTop>
            </Col>

            <Col sm={12} md={6} lg={3} xl={3}>
              <MarginTop>
                <AverageTime
                  data={'04:17'}
                  paragraph={'Average Pickup Time Recycling'}
                />
              </MarginTop>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withLayout(Dashboard)