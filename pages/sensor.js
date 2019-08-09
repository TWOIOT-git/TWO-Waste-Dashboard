import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCard from "../components/SensorItemCard";
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
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();
      let data = [];
      for (let sensor of json.results) {
        data.push({
          id: sensor.sensor_id,
          name: sensor.sensor_id,
          robinSize: "Robin XL",
          porcentage: sensor.fill_percentage,
          location: {
            city: "Taipei",
            street: "XinYi Rd.",
            outIn: "indoor"
          },
          owner: {
            name: sensor.customer_id
          },
          fill_reports: (sensor.reports) ? JSON.parse(sensor.reports) : [],
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
              <SensorItemCard {...item} />
            </div>
          ))}
          <style jsx>{`
            .Container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;

              > div {
                width: 40vw;
              }
            }
          `}</style>
        </div>
      </LayoutMenuNavegation>
    );
  }
}

export default withAuthSync(Sensor)
