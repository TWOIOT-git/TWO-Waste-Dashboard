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
    installed_sensors: [
      {id: 'ID01', name: '1st North Waste'},
      {id: 'ID02', name: ''},
      {id: 'ID03', name: '1st North Paper'},
      {id: 'ID04', name: '1st North Plastic'},
      {id: 'ID05', name: '1st South Waste'},
      {id: 'ID06', name: '1st South Plastic'},
      {id: 'ID07', name: '1st South Paper'},
      {id: 'ID08', name: '2nd North Waste'},
      {id: 'ID09', name: ''},
      {id: 'ID10', name: ''},
      {id: 'ID11', name: ''},
      {id: 'ID12', name: ''},
      {id: 'ID13', name: ''},
      {id: 'ID14', name: ''},
      {id: 'ID15', name: '2nd North Plastic'},
      {id: 'ID16', name: '2nd North Paper'},
      {id: 'ID17', name: ''},
      {id: 'ID18', name: '2nd South Plastic'},
      {id: 'ID19', name: ''},
      {id: 'ID20', name: ''},
      {id: 'ID21', name: ''},
      {id: 'ID22', name: ''},
      {id: 'ID23', name: ''},
      {id: 'ID24', name: '2nd South Waste'}
    ]
  }


  fetch_data = function() {
    let sensor_array = []
    let self = this;

    this.state.installed_sensors.forEach(function (sensor, index) {

      fetch('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=' + sensor.id, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
          }
        })
        .then(res => res.json())
        .then(res => {
            let sensor_data = res.Items[0];
            if(sensor_data) {
              if(sensor.name) {
                sensor_data.name = sensor.name;
              } else {
                sensor_data.name = "Unknown";
              }
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
                        location={sensor.name}
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
