import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ProgressChartVictoryPorcentage from '../../components/ProgressChartVictoryPorcentage';
import withLayout from '../../hoc/withLayout';
import Margin from '../../components/Margin';
import Title from '../../components/Title';

class Realtime extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.fetchPoolData = setInterval(
      () => this.setState({
        data: new Array(25).fill(undefined).map(() => Math.floor(Math.random() * 101))
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
          <Row>
            {data ? data.map((n, i) => (
              <Margin orientation='bottom' breakpoints={['xs', 'sm', 'md', 'lg', 'xl']}>
                <Col sm={12} md={6} lg={3} xl={3} key={i}>
                  <ProgressChartVictoryPorcentage
                    data={Math.floor(Math.random() * 100)}
                    paragraph={'RT Total Waste'}
                  />
                </Col>
              </Margin>
            )) : <Title>Loading</Title>
            }
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withLayout(Realtime)