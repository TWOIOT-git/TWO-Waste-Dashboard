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
import { API, Logger } from 'aws-amplify'

const logger = new Logger('SensorPage')

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
      bin_location: '',
      edit_volume: 0,
      edit_min_distance: 0,
      edit_max_distance:0,
      edit_schedule: 3600 * 12,
      edit_nickname: '',
      edit_bin_location: '',
    }

    this.getSensor = this.getSensor.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getSensor()
  }
  componentWillUnmount() {
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

    const sensor = await API.del('lidbotAPI', `/sensors/${this.state.sensor_id}`, null)

    Router.push('/sensors')
  }

  async getSensor() {
    const sensor = await API.get('lidbotAPI', `/sensors/${this.state.sensor_id}`, null)
    const reports = await API.get('lidbotAPI', `/sensors/${this.state.sensor_id}/reports/from/${this.state.from}/to/${this.state.to}`, null)
    const events = await API.get('lidbotAPI', `/sensors/${this.state.sensor_id}/events`, null)

    this.setState({
      ...sensor,
      loading: false,
      reports: reports.map(report => {
          return {
            ...report,
            when: report.created_on,
            v: (!isNaN(report.fill_percentage)) ? Math.round(report.fill_percentage) : null,
            temperature: report.t,
            t: moment.unix(report.created_on).format('HH:mm')
          }
        }),
      events: events.map(event => {
        return {
          ...event,
          sensor_id: event.report.sensor_id,
          event_id: event.event_id,
          message: event.message,
        }
      })
    })
  }

  async deleteAllReports(e, sensor_id) {
    e.preventDefault()

    const reports = await API.del('lidbotAPI', `/sensors/${this.state.sensor_id}/reports`, null)

    logger.debug('Deleted reports: ', reports)

    toast(this.props.t('reports-deleted'), {
      className: 'notification success'
    })

    this.getSensor()
  }


  async deleteReport(e, sensor_id, created_on) {
    e.preventDefault()

    const report = await API.del('lidbotAPI', `/sensors/${this.state.sensor_id}/reports/${created_on}`, null)

    logger.debug('Deleted report: ', report)

    toast(this.props.t('report-deleted'), {
      className: 'notification success'
    })

    this.getSensor()
  }

  async deleteEvent(e, customer_id, event_id) {
    e.preventDefault()

    const event = await API.del('lidbotAPI', `/sensors/${customer_id}/events/${event_id}`, null)

    logger.debug('Deleted events: ', event)

    toast(this.props.t('event-deleted'), {
      className: 'notification success'
    })

    this.getSensor()
  }

  async deleteEvents(e, customer_id, sensor_id) {
    e.preventDefault()

    const events = await API.del('lidbotAPI', `/sensors/${this.state.sensor_id}/events`, null)

    logger.debug('Deleted events: ', events)

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
      edit_bin_location: this.state.bin_location,
      edit_schedule: this.state.schedule,
      edit_min_distance: this.state.min_distance,
      edit_max_distance: this.state.max_distance,
    })
  }

  updateSensor = async(e) => {
    e.preventDefault()

    const sensor = await API.post('lidbotAPI', `/sensors/${this.state.sensor_id}`, {
      body: {
        volume: this.state.edit_volume,
        nickname: this.state.edit_nickname,
        bin_location: this.state.edit_bin_location,
        schedule: this.state.edit_schedule,
        min_distance: this.state.edit_min_distance,
        max_distance: this.state.edit_max_distance,
      }
    })

    this.setState({
      volume: this.state.edit_volume,
      nickname: this.state.edit_nickname,
      bin_location: this.state.edit_bin_location,
      schedule: this.state.edit_schedule,
      min_distance: this.state.edit_min_distance,
      max_distance: this.state.edit_max_distance,
    })

    this.setShowEditSensorModal(null, false)

    toast(this.props.t('sensor-updated'), {
      className: 'notification success'
    })

    this.getSensor()
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
                      <label htmlFor="bin_location">
                        {this.props.t('bin_location')}
                        <input
                          name="edit_bin_location"
                          id="edit_bin_location"
                          value={this.state.edit_bin_location}
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
