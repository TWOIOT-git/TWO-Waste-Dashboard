import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ProgressChartVictoryPorcentage from '../../components/ProgressChartVictoryPorcentage';
import withLayout from '../../hoc/withLayout';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';
import Margin from '../../components/Margin';
import Loader from '../../components/Loader';
import FadeIn from '../../components/FadeIn';

class Realtime extends Component {
  state = {
    data: null,
    chartsNames: [
      '1st Floor - Mens Waste',
      '1st Floor - Mens Recycling',
      '1st Floor - Mens Other',
      '1st Floor - Womens Waste',
      '1st Floor - Womens Recycling',
      '1st Floor - Womens Other',
      '2nd Floor - Mens Waste',
      '2nd Floor - Mens Recycling',
      '2nd Floor - Mens Other',
      '2nd Floor - Womens Waste',
      '2nd Floor - Womens Recycling',
      '2nd Floor - Womens Other',
      '3rd Floor - Mens Waste',
      '3rd Floor - Mens Recycling',
      '3rd Floor - Mens Other',
      '3rd Floor - Womens Waste',
      '3rd Floor - Womens Recycling',
      '3rd Floor - Womens Other',
      'B Floor - Mens Waste',
      'B Floor - Mens Recycling',
      'B Floor - Mens Other',
      'B Floor - Womens Waste',
      'B Floor - Womens Recycling',
      'B Floor - Womens Other'
    ]
  }

  componentDidMount() {
    this.fetchPoolData = setInterval(
      () => this.setState({
        data: new Array(24).fill(undefined).map((_, i) => ({
          value: Math.floor(Math.random() * 101),
          text: this.state.chartsNames[i]
        }))
      }),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchPoolData);
  }

  render() {
    const { data } = this.state
    return (
      <React.Fragment>
        <Container fluid>
          {data ?
            <Row>
              {data.map((n, i) => (
                <Margin
                  orientation='bottom'
                  breakpoints={['xs', 'sm', 'md', 'lg', 'xl']}
                  key={i}
                >
                  <Col sm={12} md={6} lg={4} xl={4}>
                    <FadeIn>
                      <ProgressChartVictoryPorcentage
                        data={n.value}
                        paragraph={n.text}
                      />
                    </FadeIn>
                  </Col>
                </Margin>
              ))
              }
            </Row>
            : (
              <Loader />
            )
          }
        </Container>
      </React.Fragment>
    )
  }
}

export default onlyAuthenticated(withLayout(Realtime))