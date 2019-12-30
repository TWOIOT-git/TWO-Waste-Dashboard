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
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'

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
      showEditSensorModal: false,
      volume: 0,
      min_distance: 0,
      max_distance:0,
      schedule: 3600 * 12,
      nickname: '',
      refresh: 10000,
      edit_volume: 0,
      edit_min_distance: 0,
      edit_max_distance:0,
      edit_schedule: 3600 * 12,
      edit_nickname: '',
      edit_refresh: 10000
    }

    this.getSensor = this.getSensor.bind(this);
    this.interval = null
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getSensor()
    this.interval = setInterval(this.getSensor, this.state.refresh);
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
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

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
      const reports_response = await fetch(reports_url);
      if (!reports_response.ok) {
        throw Error(reports_response.statusText);
      }

      let events_url = `${process.env.DEVICE_API}/customers/${this.context.user.attributes['custom:client_id']}/sensors/${this.state.sensor_id}/events`
      const events_response = await fetch(events_url);
      if (!events_response.ok) {
        throw Error(reports_response.statusText);
      }

      const sensor = await sensor_response.json();
      const reports = await reports_response.json();
      const events = await events_response.json();

      this.setState({
          ...sensor,
        loading: false,
        reports: (reports.results) ? (reports.results).map(report => {
            return {
              ...report,
              when: report.created_on,
              v: Math.round(report.fill_percentage),
              temperature: report.t,
              t: moment.unix(report.created_on).format('HH:mm')
            }
          }) : [],
        events: (events.results) ? (events.results).map(event => {
          return {
            ...event,
            sensor_id: event.report.sensor_id,
            event_id: event.event_id,
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
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    toast(this.props.t('reports-deleted'), {
      className: 'notification success'
    })

    this.getSensor()

  }


  async deleteReport(e, sensor_id, created_on) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "sensors/" + sensor_id + "/reports/" + created_on
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    toast(this.props.t('report-deleted'), {
      className: 'notification success'
    })

    this.getSensor()

  }

  async deleteEvent(e, customer_id, event_id) {
    e.preventDefault()

    let url = `${process.env.DEVICE_API}customers/${customer_id}/events/${event_id}`
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    toast(this.props.t('event-deleted'), {
      className: 'notification success'
    })

    this.getSensor()
  }

  async onDebugInfo(e, customer_id, event_id) {
    e.preventDefault()

    this.state.events.map(event => {
      if(event.event_id === event_id) {
        console.log(event)
      }
    })
  }

  async deleteEvents(e, customer_id, sensor_id) {
    e.preventDefault()

    let url = `${process.env.DEVICE_API}customers/${customer_id}/sensors/${sensor_id}/events`
    console.log(url)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    toast(this.props.t('events-deleted'), {
      className: 'notification success'
    })

    this.getSensor()

    console.log(json)
  }

  setShowEditSensorModal = (e, show) => {
    if(e) {
      e.preventDefault()
    }

    this.setState({
      showEditSensorModal: show,
      edit_volume: this.state.volume,
      edit_nickname: this.state.nickname,
      edit_schedule: this.state.schedule,
      edit_min_distance: this.state.min_distance,
      edit_max_distance: this.state.max_distance,
      edit_refresh: this.state.refresh,
    })
  }

  updateSensor = async(e) => {
    e.preventDefault()

    let url = `${process.env.DEVICE_API}sensors/${this.state.sensor_id}`
    let options = {
      method: 'POST',
      body: JSON.stringify({
        volume: this.state.edit_volume,
        nickname: this.state.edit_nickname,
        schedule: this.state.edit_schedule,
        min_distance: this.state.edit_min_distance,
        max_distance: this.state.edit_max_distance,
      })
    }

    this.setState({
      volume: this.state.edit_volume,
      nickname: this.state.edit_nickname,
      schedule: this.state.edit_schedule,
      min_distance: this.state.edit_min_distance,
      max_distance: this.state.edit_max_distance,
      refresh: this.state.edit_refresh,
    })

    const response = await fetch(url, options)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    this.setShowEditSensorModal(null, false)

    toast(this.props.t('sensor-updated'), {
      className: 'notification success'
    })

    clearInterval(this.interval)

    this.getSensor()
    this.interval = setInterval(this.getSensor, this.state.refresh);
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
                onDeleteAllEvents={(e, customer_id, sensor_id) => this.deleteEvents(e, customer_id, sensor_id)}
                onEdit={(e) => this.setShowEditSensorModal(e, true)}
                active={this.state.active}/>
            </div>
            <Modal
              show={this.state.showEditSensorModal}
              onHide={() => this.setShowEditSensorModal(null, false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{this.props.t('edit-sensor')}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form action="">
                  <div className="div-inputs">
                    <div>
                      <label htmlFor="nickname">
                        {this.props.t('nickname')}
                        <input
                          name="edit_nickname"
                          id="edit_nickname"
                          value={this.state.edit_nickname}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="min_distance">
                        {this.props.t('min_distance')}
                        <input
                          name="edit_min_distance"
                          id="edit_min_distance"
                          value={this.state.edit_min_distance}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="max_distance">
                        {this.props.t('max_distance')}
                        <input
                          name="edit_max_distance"
                          id="edit_max_distance"
                          value={this.state.edit_max_distance}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="volume">
                        {this.props.t('volume')}
                        <input
                          name="edit_volume"
                          id="edit_volume"
                          value={this.state.edit_volume}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="schedule">
                        {this.props.t('schedule')}
                        <input
                          name="edit_schedule"
                          id="edit_schedule"
                          value={this.state.edit_schedule}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="refresh">
                        {this.props.t('refresh')}
                        <input
                          name="edit_refresh"
                          id="edit_refresh"
                          value={this.state.edit_refresh}
                          onChange={this.onChange}
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <div className="add-user-button" onClick={() => this.setShowEditSensorModal(null, false)}>{this.props.t('cancel')}</div>
                <div className="add-user-button" onClick={(e) => this.updateSensor(e)}>{this.props.t('save')}</div>
              </Modal.Footer>
            </Modal>
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
                onDelete={(e, customer_id, event_id) => this.deleteEvent(e, customer_id, event_id)}
                onDebugInfo={(e, customer_id, event_id) => this.onDebugInfo(e, customer_id, event_id)}
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
                line-volume: normal;
              }
            }
          `}</style>
        </div>
      </LayoutMenuNavegation>
    );
  }
}

export default withTranslation('sensor')(withAuthSync(Sensor))
