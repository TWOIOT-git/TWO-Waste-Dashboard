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
import Margin from '../../components/Margin';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';
import Loader from '../../components/Loader';

class Dashboard extends Component {
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

  fetch_data() {
    let sensor_array = []

    let self = this;
    this.state.installed_sensor_ids.forEach(function (sensor_id, index) {
      fetch('https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=' + sensor_id + '&limit=10', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx'
          }
        })
        .then(res => res.json())
        .then(res => {
          let sensor_data = res.Items;
          if (sensor_data.length > 0) {
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


    this.fetchDataInterval = setInterval(() => this.fetch_data(this) , 600000);

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
              <TextWithNumberButtom text={sensor[0].sensor_id} number={Math.round(-1 * (((sensor[sensor.length - 1].bin_level / 850) * 100) - 100))} />
              <GrowthChart data={sensor.map(a => {
                var date = new Date(a.fill_date)
                a.time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                a.percentage = Math.round(-1 * (((a.bin_level / 850) * 100) - 100))
                return a
              })} />
            </Col>
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

export default onlyAuthenticated(withLayout(Dashboard))
