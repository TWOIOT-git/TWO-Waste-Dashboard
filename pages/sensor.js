import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCardExpanded from "../components/SensorItemCardExpanded";
import moment from "moment";
import { withAuthSync, ClientContext } from '../utils/auth'
import getConfig from 'next/config'
import { withTranslation } from '../i18n'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

class Sensor extends Component {
  static contextType = ClientContext;

  static async getInitialProps ({ query: { id } }) {
    return { sensor_id: id, namespacesRequired: ['sensor'] }
  }

  constructor(props) {
    super(props);

    let now = moment();

    this.state = {
      sensor_id: this.props.sensor_id,
      to: now.valueOf(),
      from: now.subtract(24, 'hours').valueOf(),
      active: '24',
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

  handleClick(time) {
    let now = moment();
    this.setState({
      active: time,
      to: now.valueOf(),
      from: now.subtract(time, 'hours').valueOf(),
    })
    this.refresh();
  }

  async refresh() {
    try {
      let url = publicRuntimeConfig.deviceApi + "customers/" + this.context.user.attributes['custom:client_id'] + "/sensors/" + this.state.sensor_id;
      const sensor_response = await fetch(url);
      if (!sensor_response.ok) {
        throw Error(sensor_response.statusText);
      }

      let reports_url = publicRuntimeConfig.deviceApi + "sensors/" + this.state.sensor_id + "/reports/from/" + this.state.from + "/to/" + this.state.to;
      console.log(reports_url);
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
          fill_reports: reports_json.results.map(obj => {
            var rObj = {
              fp: Math.round(obj.fill_percentage),
              fd: moment(obj.created_on).format('HH:mm Do')
            };
            return rObj;
          }),
          time: moment(sensor.updated_on).fromNow()
        })
      }
      this.setState({ data });

    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { data, sensor_id, active } = this.state;

    return (
      <LayoutMenuNavegation>
        <Head title={`lidbot - ${sensor_id}`} />
        <div className="Container">
          {data.map(item => (
            <div key={item.id} className="ItemCol">
              <SensorItemCardExpanded {...item} onClick={(time) => this.handleClick(time)} active={active}/>
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

export default withTranslation('sensor')(withAuthSync(Sensor))
