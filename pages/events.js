import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import EventItemCard from "../components/EventItemCard";
import EventTable from "../components/EventTable";
import fetch from "isomorphic-unfetch";
import { withAuthSync, ClientContext } from '../utils/auth'
import breakpoints from "../utils/breakpoints";
import { withTranslation } from '../i18n'
import { API, Logger } from 'aws-amplify'

class Sensors extends React.Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['sensor'],
  })

  constructor(props) {
    super(props);

    this.state = {
      layoutMode: "table",
      loading: true,
      events: [
      ]
    };
  }

  async deleteEvent(e, event_id) {
    e.preventDefault()

    this.getEvents()
  }

  async componentDidMount() {
      await this.getEvents();
  }

  async getEvents() {
    const events = await API.get('lidbotAPI', `/events`, null)

    this.setState({
      events: events.map(event => {
        return {
          ...event,
          sensor_id: event.report.sensor_id,
          event_id: event.event_id,
          message: event.message,
        }
      })
      ,
      loading: false
    })
  }

  render() {
      return (
        <LayoutMenuNavegation
          signOut={true}
        >
          <Head title="Sensors | lidbot"/>
          <TopTools
            layoutMode={this.state.layoutMode}
            onChangeLayout={value => this.setState({layoutMode: value})}
          />
          <div className="SensorsContainer">
            <If condition={this.state.loading === false}>
              <If condition={this.state.events.length === 0}>
                <div className="no-sensor-container">
                  <h1>{this.props.t('no-events')}</h1>
                </div>
              </If>
              <If condition={this.state.layoutMode === "cards"}>
                {this.state.events.map(item => (
                  <div key={`${item.sensor_id}-${item.report_created_on}-${item.type}`} className="ItemCol">
                    <EventItemCard {...item} />
                  </div>
                ))}
              </If>
              <If condition={this.state.layoutMode === "table"}>
                <EventTable
                  items={this.state.events}
                  onDelete={(e, customer_id, event_id) => this.deleteEvent(e, customer_id, event_id)}
                />
              </If>
            </If>
            <If condition={this.state.loading === true}>
              <h1>Loading...</h1>
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
      )
  }
}

export default withTranslation('sensor')(withAuthSync(Sensors))
