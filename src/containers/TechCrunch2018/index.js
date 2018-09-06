import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ProgressChartVictoryPorcentage from '../../components/ProgressChartVictoryPorcentage';
import withLayout from '../../hoc/withLayout';
import Margin from '../../components/Margin';
import Loader from '../../components/Loader';
import FadeIn from '../../components/FadeIn';

class TechCrunch2018 extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.fetchPoolData = setInterval(
      () => {
        fetch('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=ID01', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
          }
        }).then(res => res.json())
          .then(res => {
            console.log(res)
            console.log((res.Items[0].bin_level / res.Items[0].max_distance) * 100)
            this.setState({
              data: {
                value: (res.Items[0].bin_level / res.Items[0].max_distance) * 100,
                text: 'Sensor ID01'
              }
            })
          })
          .catch(err => console.log(err))
      },
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
          {data ? (
            <Row>
              <Margin
                orientation='bottom'
                breakpoints={['xs', 'sm', 'md', 'lg', 'xl']}
              >
                <Col sm={12} md={6} lg={4} xl={4}>
                  <FadeIn>
                    <ProgressChartVictoryPorcentage
                      data={data.value}
                      paragraph={data.text}
                    />
                  </FadeIn>
                </Col>
              </Margin>
            </Row>
          )
            : <Loader />
          }
        </Container>
      </React.Fragment>
    )
  }
}

export default withLayout(TechCrunch2018)