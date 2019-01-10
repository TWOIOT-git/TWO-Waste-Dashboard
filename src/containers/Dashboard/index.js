import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import GrowthChart from '../../components/GrowthChart'
import TextWithNumberButtom from '../../components/TextWithNumberButtom'
import withLayout from '../../hoc/withLayout';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';
import Loader from '../../components/Loader';
import FlexCenter from '../../components/FlexCenter'

class Dashboard extends Component {
  state = {
    data: null,
    installed_sensors: [
      { id: 'ID31', name: 'TTA Waste 3rd Floor'},
      { id: 'ID32', name: 'TTA Recycling 3rd Floor #1 '},
      { id: 'ID33', name: 'TTA Recycling 3rd Floor #2'},
      { id: 'ID34', name: 'TTA Waste 4th Floor' },
      { id: 'ID35', name: 'TTA Recycling 4th Floor' },
      { id: 'ID36', name: 'Futureward Central Recycling' },
      { id: 'ID37', name: 'Futureward Central Waste' }
    ]
  }

  fetch_data() {
    let sensor_array = []

    let self = this;
    this.state.installed_sensors.forEach(function (sensor, index) {
      fetch('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=' + sensor.id + '&limit=50', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
        }
      })
        .then(res => res.json())
        .then(res => {
          let sensor_data = res.Items;
          if (sensor_data.length > 0) {
            var period = new Date();
            period.setDate(period.getDate() - 3);
            var last_sensor_date = new Date(sensor_data[0].fill_date);
            // return if last_sensor_date is older than 3 days
            if (last_sensor_date <= period) {
              return
            }
            if (sensor.name) {
              sensor_data.name = sensor.name;
            } else {
              sensor_data.name = "Unknown";
            }
            sensor_data = sensor_data.sort(function (a, b) {
              return new Date(a.fill_date) - new Date(b.fill_date);
            })
            sensor_array.push(sensor_data)
            sensor_array = sensor_array.sort(function (a, b) {
              return ('' + a[0].sensor_id).localeCompare(b[0].sensor_id);
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


    this.fetchDataInterval = setInterval(() => this.fetch_data(this), 600000);

  }

  componentWillUnmount() {
    clearInterval(this.fetchDataInterval)
  }

  render() {
    const { data } = this.state
    const colStyle = {
      marginBottom: '40px',
    };
    return (
      <React.Fragment>
        <Container fluid>
          {data ?
            <Row>
              {data.map((sensor, i) => (
                <Col
                  md={12} style={colStyle}>
                  <TextWithNumberButtom text={sensor.name} name={sensor[0].sensor_id} number={Math.round(-1 * (((sensor[sensor.length - 1].bin_level / 850) * 100) - 100))} />
                  <GrowthChart data={sensor.map(a => {
                    var date = new Date(a.fill_date)
                    a.time = date.toLocaleTimeString(["en-US"], { weekday: "short", month: "short", day: "numeric", hour: '2-digit' });
                    a.percentage = Math.round(-1 * (((a.bin_level / 850) * 100) - 100))
                    return a
                  })} />
                </Col>
              ))
              }
            </Row>
            : (
              <FlexCenter>
                <Loader />
              </FlexCenter>
            )
          }
        </Container>
      </React.Fragment>
    )
  }
}

export default onlyAuthenticated(withLayout(Dashboard))
