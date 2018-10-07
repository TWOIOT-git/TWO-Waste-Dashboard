import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ProgressChartVictoryPorcentage from '../../components/ProgressChartVictoryPorcentage';
import withLayout from '../../hoc/withLayout';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';
import Margin from '../../components/Margin';
import Loader from '../../components/Loader';
import FadeIn from '../../components/FadeIn';

const axios = require('axios');


class Realtime extends Component {
  state = {
    data: null,
    sensors_ids: [
      'ID01',
      'ID02',
      'ID03',
      'ID04',
      'ID05',
      'ID06',
      'ID07',
      'ID08',
      'ID09',
      'ID010',
      'ID011',
      'ID012',
      'ID013',
      'ID014',
      'ID015',
      'ID016',
      'ID017',
      'ID018',
      'ID019',
      'ID020',
      'ID021',
      'ID022',
      'ID023',
      'ID024'
    ]
  }


  fetch_data = function() {
    let sensor_data = []
    this.setState({
      data: []
    })
    let self = this;
    this.state.sensors_ids.forEach(function (id, index) {

      axios.get('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api', {
          params: {
            sensor_id: id
          },
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
          }
        })
        .then(function (response) {
          if(response.data.Items[0]) {
            sensor_data.push(response.data.Items[0])
            self.setState({
              data: sensor_data
            })
          }

        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });

    });
  }


  componentDidMount() {

    this.fetch_data(this);

    this.interval = setInterval(() => this.fetch_data(this) , 10000);

  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  calc_fill_percentate(bin_level) {

    // max bin_level = 7500
    // if bin_level == 7500 => Trash can is empty
    // if bin_level == 0 => Trash can is full empty
    let percentage = 0;

    const MAX_BIN_LEVEL = 7500;

    if(bin_level >= MAX_BIN_LEVEL) {
      percentage = 0;
    } else if(bin_level <= 0) {
      percentage = 100
    } else {
      percentage = bin_level / MAX_BIN_LEVEL * 100
    }

    return percentage
  }

  render() {
    const { data } = this.state
    return (
      <React.Fragment>
        <Container fluid>
          {data ?
            <Row>
              {data.map((sensor, i) => (
                <Margin
                  orientation='bottom'
                  breakpoints={['xs', 'sm', 'md', 'lg', 'xl']}
                  key={i}
                >
                  <Col sm={12} md={6} lg={4} xl={4}>
                    <FadeIn>
                      <ProgressChartVictoryPorcentage
                        data={this.calc_fill_percentate(sensor.bin_level)}
                        paragraph={sensor.bin_location + " ID: " + sensor.sensor_id}
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
