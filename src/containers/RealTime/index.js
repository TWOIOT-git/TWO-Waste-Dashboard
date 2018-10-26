import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ProgressChartTrashCan from '../../components/ProgressChartTrashCan';
import withLayout from '../../hoc/withLayout';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';
import Margin from '../../components/Margin';
import Loader from '../../components/Loader';
import FadeIn from '../../components/FadeIn';


class Realtime extends Component {
  state = {
    data: null,
    installed_sensor_ids: [
      'ID01',
      'ID02',
      'ID03',
      'ID04',
      'ID05',
      'ID06',
      'ID07',
      'ID08',
      'ID09',
      'ID10',
      'ID11',
      'ID12',
      'ID13',
      'ID14',
      'ID15',
      'ID16',
      'ID17',
      'ID18',
      'ID19',
      'ID20',
      'ID21',
      'ID22',
      'ID23',
      'ID24'
    ]
  }


  fetch_data = function() {
    let sensor_array = []
    let self = this;

    this.state.installed_sensor_ids.forEach(function (sensor_id, index) {

      fetch('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=' + sensor_id, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
          }
        })
        .then(res => res.json())
        .then(res => {
            let sensor_data = res.Items[0];
            if(sensor_data) {
              sensor_array.push(sensor_data)
              sensor_array = sensor_array.sort(function (a, b) {
                  return ('' + a.sensor_id).localeCompare(b.sensor_id);
              })
              self.setState({
                data: sensor_array
              })
            }
        })
        .catch(err => console.log("err", err))
    });
  }


  componentDidMount() {

    this.fetch_data(this);

    this.fetchDataInterval = setInterval(() => this.fetch_data(this) , 600000);

  }

  componentWillUnmount() {
    clearInterval(this.fetchDataInterval)
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
                      <ProgressChartTrashCan
                        data={-1 * (((sensor.bin_level / 850) * 100) - 100)}
                        location={sensor.bin_location}
                        id={sensor.sensor_id}
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
