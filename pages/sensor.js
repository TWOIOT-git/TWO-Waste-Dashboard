import Router from 'next/router'
import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCardExpanded from "../components/SensorItemCardExpanded";
import ReportTable from "../components/ReportTable";
import moment from "moment";
import { withAuthSync, ClientContext } from '../utils/auth'
import { withTranslation } from '../i18n'
import EventTable from "../components/EventTable";

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
    this.interval = setInterval(this.getSensor, 10000);
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

  async deleteSensor(e) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "sensors/" + this.state.sensor_id
    console.log('deleting sensor: ', url)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    console.log(json)

    Router.push('/sensors')
  }


  async getSensor() {
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

      let events_url = `${process.env.DEVICE_API}/customers/${this.context.user.attributes['custom:client_id']}/sensors/${this.state.sensor_id}/events`
      console.log(events_url);
      const events_response = await fetch(events_url);
      if (!events_response.ok) {
        throw Error(reports_response.statusText);
      }

      const sensor = await sensor_response.json();
      const reports = await reports_response.json();
      const events = await events_response.json();

      console.log(events)

      this.setState({
          ...sensor,
        loading: false,
        reports: (reports.results) ? (reports.results).map(report => {
            return {
              ...report,
              when: moment.unix(report.created_on).format('YYYY-M-D HH:mm'),
              v: Math.round(report.fill_percentage),
              t: moment.unix(report.created_on).format('HH:mm')
            }
          }) : [],
        events: (events.results) ? (events.results).map(event => {
          return {
            ...event,
            report_created_on: event.report.created_on,
            sensor_id: event.report.sensor_id,
            event_id: event.event_id,
            type: event.type,
            message: event.message,
          }
        }) : []
        }
      )

    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllReports(e, sensor_id) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "sensors/" + sensor_id + "/reports/"
    console.log('deleting report: ', url)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    this.getSensor()

    console.log(json)
  }


  async deleteReport(e, sensor_id, created_on) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "sensors/" + sensor_id + "/reports/" + created_on
    console.log('deleting report: ', url)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    this.getSensor()

    console.log(json)
  }


  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={`${this.state.sensor_id} | Lidbot`} />
        <div className="Container">
          <If condition={this.state.loading === false}>
            <div key={this.state.sensor_id} className="widget">
              <SensorItemCardExpanded
                {...this.state}
                onClick={(time) => this.handleClick(time)}
                onDelete={(e) => this.deleteSensor(e)}
                onDeleteAllReports={(e, sensor_id) => this.deleteAllReports(e, sensor_id)}
                active={this.state.active}/>
            </div>
            <div className="widget">
              <h2>Latest reports</h2>
              <ReportTable
                items={this.state.reports}
                onDelete={(e, sensor_id, created_on) => this.deleteReport(e, sensor_id, created_on)}
              />
            </div>
            <div className="widget">
              <h2>Latest events</h2>
              <EventTable
                items={this.state.events}
                onDelete={(e, sensor_id, created_on) => this.deleteReport(e, sensor_id, created_on)}
              />
            </div>
          </If>
          <If condition={this.state.loading === true}>
            <h1>Loading...</h1>
          </If>
          <style jsx>{`
            .Container {
              padding: 25px;
            }
            .widget {
              margin: 0 0 80px 0;

              > h2 {
                margin: 0 0 15px 0;
                color: #333333;
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 26px;
                line-height: normal;
              }
            }
          `}</style>
        </div>
      </LayoutMenuNavegation>
    );
  }
}

export default withTranslation('sensor')(withAuthSync(Sensor))
