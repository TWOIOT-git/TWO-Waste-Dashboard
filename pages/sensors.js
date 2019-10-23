import React from "react";
import moment from "moment";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import SensorItemCard from "../components/SensorItemCard";
import SensorTable from "../components/SensorTable";
import fetch from "isomorphic-unfetch";
import { withAuthSync, ClientContext } from "../utils/auth";
import breakpoints from "../utils/breakpoints";
import { withTranslation } from "../i18n";
import ActivityIndicator from "../components/ActivityIndicator";

class Sensors extends React.Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ["sensor"]
  });

  constructor(props) {
    super(props);

    this.state = {
      layoutMode: "cards",
      loading: true,
      data: []
    };
  }

  async componentDidMount() {
    let data = await this.getSensors();
    this.setState({
      data: data,
      loading: false
    });
  }

  async getSensors() {
    try {
      let url =
        process.env.DEVICE_API +
        "customers/" +
        this.context.user.attributes["custom:client_id"] +
        "/sensors";
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      let data = [];
      for (let sensor of json.results) {
        data.push({
          ...sensor,
          reports: sensor.reports
            ? JSON.parse(sensor.reports).map(obj => {
                return {
                  v: Math.round(obj.v),
                  t: moment(obj.t).format("HH:mm")
                };
              })
            : []
        });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { data, layoutMode } = this.state;

    return (
      <LayoutMenuNavegation signOut={true}>
        <Head title="Sensors | lidbot" />
        <If condition={this.state.loading === false}>
          <If condition={data.length}>
            <TopTools
              layoutMode={layoutMode}
              onChangeLayout={value => this.setState({ layoutMode: value })}
            />
          </If>
        </If>
        <div
          className={`SensorsContainer ${
            this.state.loading === false && data.length === 0 ? "empty" : ""
          }`}
        >
          <If condition={this.state.loading === false}>
            <If condition={data.length === 0}>
              <div className="no-sensor-container">
                <h1>{this.props.t("no-sensors")}</h1>
                <p>
                  {this.props.t("no-sensors-sub-1")}
                  <a href="https://lidbot.com/contact" target="_blank">
                    {this.props.t("no-sensors-sub-link")}
                  </a>
                  {this.props.t("no-sensors-sub-2")}
                </p>
                <div className="register-sensor">
                  {this.props.t("register-sensor")}
                </div>
              </div>
            </If>
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
          </If>
          <If condition={this.state.loading === true}>
            <ActivityIndicator height='100vh'/>
          </If>
        </div>
        <style jsx>{`
          .register-sensor {
            padding: 25px;
            cursor: pointer;
            background: #00bf8d;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            max-width: 400px;
          }
          .no-sensor-container {
            margin-top: 50px;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }
          a {
            color: #00b284;
            font-weight: bold;
          }
          h1 {
            font-family: Roboto;
            font-style: normal;
            font-weight: 900;
            font-size: 32px;
            line-height: normal;
            color: #000000;
          }

          p {
            font-family: Roboto;
            font-style: normal;
            font-weight: 300;
            font-size: 18px;
            line-height: 25px;
            color: #757575;
          }
          .SensorsContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 0 30px 30px 30px;
            margin-top: 22px;

            &.empty {
              margin-top: 0;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              > div {
                margin-top: 0 !important;
              }
            }

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

export default withTranslation("sensor")(withAuthSync(Sensors));
