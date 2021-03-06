import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import ProgressChartTrashCan from "../../components/ProgressChartTrashCan";
import withLayout from "../../hoc/withLayout";
import onlyAuthenticated from "../../hoc/onlyAuthenticated";
import Margin from "../../components/Margin";
import Loader from "../../components/Loader";
import FadeIn from "../../components/FadeIn";
import FlexCenter from "../../components/FlexCenter";

class Realtime extends Component {
  state = {
    data: null,
    installed_sensors: [
      { id: "ID31", name: "TTA Waste 3rd Floor" },
      { id: "ID32", name: "TTA Recycling 3rd Floor #1 " },
      { id: "ID33", name: "TTA Recycling 3rd Floor #2" },
      { id: "ID34", name: "TTA Waste 4th Floor" },
      { id: "ID35", name: "TTA Recycling 4th Floor" },
      { id: "ID36", name: "Futureward Central Recycling" },
      { id: "ID37", name: "Futureward Central Waste" }
    ]
  };

  fetch_data = function() {
    let sensor_array = [];
    let self = this;

    this.state.installed_sensors.forEach(function(sensor, index) {
      fetch(
        "https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=" +
          sensor.id,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx"
          }
        }
      )
        .then(res => res.json())
        .then(res => {
          let sensor_data = res.Items[0];
          if (sensor_data) {
            var period = new Date();
            period.setDate(period.getDate() - 3);
            var last_sensor_date = new Date(sensor_data.fill_date);
            // return if last_sensor_date is older than 3 days
            if (last_sensor_date <= period) {
              return;
            }
            if (sensor.name) {
              sensor_data.name = sensor.name;
            } else {
              sensor_data.name = "Unknown";
            }
            sensor_array.push(sensor_data);
            sensor_array = sensor_array.sort(function(a, b) {
              return ("" + a.sensor_id).localeCompare(b.sensor_id);
            });
            self.setState({
              data: sensor_array
            });
          }
        })
        .catch(err => console.log("err", err));
    });
  };

  componentDidMount() {
    this.fetch_data(this);

    this.fetchDataInterval = setInterval(() => this.fetch_data(this), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchDataInterval);
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Container fluid>
          {data ? (
            <Row>
              {data.map((sensor, i) => (
                <Margin
                  orientation="bottom"
                  breakpoints={["xs", "sm", "md", "lg", "xl"]}
                  key={i}
                >
                  <Col sm={12} md={6} lg={4} xl={4}>
                    <FadeIn>
                      <ProgressChartTrashCan
                        data={-1 * ((sensor.bin_level / 900) * 100 - 100)}
                        location={sensor.name}
                        id={sensor.sensor_id}
                      />
                    </FadeIn>
                  </Col>
                </Margin>
              ))}
            </Row>
          ) : (
            <FlexCenter>
              <Loader />
            </FlexCenter>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default onlyAuthenticated(withLayout(Realtime));
