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
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
import { withTranslation } from '../i18n'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import withData from '../withData'
import * as queries from '../src/graphql/queries'
import * as subscriptions from '../src/graphql/subscriptions'


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
    this.props.subscribeToNewSensors()

    let data = [];
    this.props.sensors().map(sensor => (
      data.push({
        ...sensor,
        reports: (sensor.reports) ? JSON.parse(sensor.reports).map(obj => {
          var rObj = {
            v: Math.round(obj.v),
            t: moment(obj.t).format('HH:mm Do')
          };
          return rObj;
        }) : [],
      })

    ))

    this.setState({ data });
  }

  componentWillUnmount() {
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

const SensorsWithData = compose(
  graphql(gql(queries.listSensors), {
    options: props => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      sensors: () => {
        console.log(props.data.listSensors)
        return props.data.listSensors ? props.data.listSensors.items : []
      },
      subscribeToNewSensors: params => {
        props.data.subscribeToMore({
          document: gql(subscriptions.onCreateSensor),
          updateQuery: (prev, { subscriptionData: { data : { onCreateSensor } } }) => {
            console.log('onCreateSensor: ', onCreateSensor)
            return {
              ...prev,
              listSensors: {
                __typename: 'SensorConnection',
                items: [onCreateSensor, ...prev.listSensors.items]
              }
            }
          }
        })
      }
    })
  })
)(Sensors)

export default withTranslation('sensor')(withAuthSync(withData(SensorsWithData)))
