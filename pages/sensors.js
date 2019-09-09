import React from "react";
import moment from "moment";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import SensorItemCard from "../components/SensorItemCard";
import SensorTable from "../components/SensorTable";
import fetch from "isomorphic-unfetch";
import { withAuthSync, ClientContext } from '../utils/auth'
import breakpoints from "../utils/breakpoints";
import getConfig from 'next/config'
import { withTranslation } from '../i18n'

class Sensors extends React.Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['sensor'],
  })

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
        let url = process.env.DEVICE_API + "customers/" + this.context.user.attributes['custom:client_id'] + "/sensors";
        console.log('fetching from: ' + url);
        const response = await fetch(url);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        const json = await response.json();
    let data = [];
        for (let sensor of json.results) {
      data.push({
        ...sensor,
        reports: (sensor.reports) ? JSON.parse(sensor.reports).map(obj => {
          var rObj = {
            v: Math.round(obj.v),
            t: moment(obj.t).format('HH:mm')
          };
          return rObj;
        }) : [],
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
              <div key={item.sensor_id} className="ItemCol">
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
            justify-content: space-around;
            padding: 0 30px 30px 30px;
            margin-top: 22px;

            .ItemCol {
              width: 31%;
            }
          }
            @media (max-width: ${breakpoints.tablet}) {
            .SensorsContainer {
              .ItemCol {
                width: 45%;
              }
              }
            }
            @media (max-width: ${breakpoints.phone}) {
            .SensorsContainer {
              .ItemCol {
                width: 100%;
              }
              }
            }
        `}</style>
      </LayoutMenuNavegation>
    );
  }
}

export default withTranslation('sensor')(withAuthSync(Sensors))
