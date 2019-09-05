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

const subscription = gql`
    subscription onCreateSensor {
        onCreateSensor {
            sensor_id
            fill_percentage
            created_on
            customer_id
        }
    }
`;
const mutation = gql`
    mutation createSensor($sensor_id: ID!, $fill_percentage: Float, $customer_id: String, $created_on: AWSTimestamp) {
        createSensor(input: {
            sensor_id: $sensor_id,
            fill_percentage: $fill_percentage,
            customer_id: $customer_id,
            created_on: $created_on
        }) {
            sensor_id
            fill_percentage
            customer_id
            created_on
        }
    }
`

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
    this.props.subscribeToNewTodos()

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
        updated_on: moment(sensor.updated_on).fromNow()
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
  graphql(mutation, {
    props: props => ({
      createSensor: todo => {
        props.mutate({
          variables: todo,
          optimisticResponse: {
            __typename: 'Mutation',
            createSensor: { ...todo,  __typename: 'Sensor' }
          },
          update: (proxy, { data: { createSensor } }) => {
          }
        })
      }
    })
  }),
  graphql(gql(queries.listSensors), {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          customer_id: {
            contains: props.customerId
          }
        },
        limit: 300
      }
    }),
    props: props => ({
      sensors: () => {
        console.log(props.data.listSensors)
        return props.data.listSensors ? props.data.listSensors.items : []
      },
      subscribeToNewTodos: params => {
        props.data.subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData: { data : { onCreateSensor } } }) => {
            console.log('onCreateSensor: ', onCreateSensor)
            return {
              ...prev,
              listSensors: {
                __typename: 'SensorConnection',
                items: [onCreateSensor, ...prev.listSensors.items.filter(todo => todo.sensor_id !== onCreateSensor.sensor_id)]
              }
            }
          }
        })
      }
    })
  })
)(Sensors)

export default withTranslation('sensor')(withAuthSync(withData(SensorsWithData)))
