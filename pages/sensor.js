import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCardExpanded from "../components/SensorItemCardExpanded";
import moment from "moment";
import { withAuthSync, ClientContext } from '../utils/auth'

class Sensor extends Component {
  static contextType = ClientContext;

  static async getInitialProps ({ query: { id } }) {
    console.log('@sensor getInitialProps')
    console.log(`sensor id: ${id}`)
    return { sensor_id: id }
  }

  constructor(props) {
    super(props);

    this.state = {
      sensor_id: this.props.sensor_id,
      data: [
      ]
    }
  }

  componentDidMount() {
    this.refresh();
    this.timerID = setInterval(
      () => this.refresh(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async refresh() {
    try {
      let url = "https://api.lidbot.com/device/customers/" + this.context.client_id + "/sensors/" + this.state.sensor_id;

      console.log('fetching from: ' + url);
      const sensor_response = await fetch(url);
      if (!sensor_response.ok) {
        throw Error(sensor_response.statusText);
      }

      let reports_url = "https://api.lidbot.com/device/sensors/" + this.state.sensor_id + "/reports/limit/50";
      console.log('fetching from: ' + reports_url);
      const reports_response = await fetch(reports_url);
      if (!reports_response.ok) {
        throw Error(reports_response.statusText);
      }


      const json = await sensor_response.json();
      const reports_json = await reports_response.json();

      let data = [];
      for (let sensor of json.results) {
        data.push({
          id: sensor.sensor_id,
          name: sensor.sensor_id,
          robinSize: "Robin XL",
          percentage: sensor.fill_percentage,
          location: {
            city: "Taipei",
            street: "XinYi Rd.",
            outIn: "indoor"
          },
          owner: {
            name: sensor.customer_id
          },
          fill_reports: reports_json.results,
          time: moment.unix(sensor.updated_on).fromNow()
        })
      }
      this.setState({ data });

    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { data, sensor_id } = this.state;

    return (
      <LayoutMenuNavegation>
        <Head title={`lidbot - ${sensor_id}`} />
        <div className="Container">
          {data.map(item => (
            <div key={item.id} className="ItemCol">
              <SensorItemCardExpanded {...item} />
            </div>
          ))}
          <style jsx>{`
            .Container {
              padding: 25px;
            }
          `}</style>
        </div>
      </LayoutMenuNavegation>
    );
  }
}

export default withAuthSync(Sensor)
