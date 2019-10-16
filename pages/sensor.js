import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCardExpanded from "../components/SensorItemCardExpanded";
import moment from "moment";
import { withAuthSync, ClientContext } from '../utils/auth'
import { withTranslation } from '../i18n'

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
      to: now.unix(),
      from: now.subtract(24, 'hours').unix(),
      active: '24',
      loading: true,
    }

    this.getSensor = this.getSensor.bind(this);
    this.interval = null
  }

  componentDidMount() {
    this.getSensor()
    this.interval = setInterval(this.getSensor, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleClick(time) {
    let now = moment();
    this.setState({
      active: time,
      to: now.unix(),
      from: now.subtract(time, 'hours').unix(),
    })
    this.getSensor();
  }

  async getSensor() {
    console.log('Cant stop me now!');
    try {
      let url = `${process.env.DEVICE_API}/sensors/${this.state.sensor_id}`
      const sensor_response = await fetch(url);
      if (!sensor_response.ok) {
        throw Error(sensor_response.statusText);
      }

      let reports_url = process.env.DEVICE_API + "sensors/" + this.state.sensor_id + "/reports/from/" + this.state.from + "/to/" + this.state.to;
      console.log(reports_url);
      const reports_response = await fetch(reports_url);
      if (!reports_response.ok) {
        throw Error(reports_response.statusText);
      }

      const sensor = await sensor_response.json();
      const reports = await reports_response.json();

      console.log(reports)
      this.setState({
          ...sensor,
        loading: false,
        reports: (reports.results) ? (reports.results).map(obj => {
            return {
              v: Math.round(obj.fill_percentage),
              t: moment(obj.created_on).format('HH:mm')
            }
          }) : [],
        }
      )

    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={`lidbot - ${this.state.sensor_id}`} />
        <div className="Container">
          <If condition={this.state.loading === false}>
            <div key={this.state.sensor_id} className="ItemCol">
              <SensorItemCardExpanded {...this.state} onClick={(time) => this.handleClick(time)} active={this.state.active}/>
            </div>
          </If>
          <If condition={this.state.loading === true}>
            <h1>Loading...</h1>
          </If>
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
