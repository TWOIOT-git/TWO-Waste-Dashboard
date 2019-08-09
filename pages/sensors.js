import React from "react";
import moment from "moment";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import SensorItemCard from "../components/SensorItemCard";
import SensorTable from "../components/SensorTable";
import fetch from "isomorphic-unfetch";
import { withAuthSync, ClientContext } from '../utils/auth'

class Sensors extends React.Component {
  static contextType = ClientContext;
  constructor(props) {
    super(props);

    this.state = {
      layoutMode: "cards",
      data: [
      ]
    };
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
        let url = "https://api.lidbot.com/device/customers/" + this.context.client_id + "/sensors";
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
    const { data, layoutMode } = this.state;
    return (
      <LayoutMenuNavegation
        signOut={true}
      >
        <Head title="Sensors | lidbot" />
        <TopTools
          layoutMode={layoutMode}
          onChangeLayout={value => this.setState({ layoutMode: value })}
        />
        <div className="SensorsContainer">
          <If condition={layoutMode === "cards"}>
            {data.map(item => (
              <div key={item.id} className="ItemCol">
                <SensorItemCard {...item} />
              </div>
            ))}
          </If>
          <If condition={layoutMode === "table"}>
            <SensorTable items={data} />
          </If>
        </div>
        <style jsx>{`
          .SensorsContainer {
            display: flex;
            flex-wrap: wrap;
            padding: 0 30px 30px 30px;
            margin-top: 22px;

            .ItemCol {
              width: 33.3333%;

              &:nth-child(3n + 2) {
                padding-right: 33px;
              }

              &:nth-child(3n + 1) {
                padding-right: 33px;
              }
            }
          }
        `}</style>
      </LayoutMenuNavegation>
    );
  }
}

export default withAuthSync(Sensors)
