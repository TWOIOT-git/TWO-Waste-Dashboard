// eslint-disable
// this is an auto generated file. This will be overwritten

export const getSensor = `query GetSensor($sensor_id: ID!) {
  getSensor(sensor_id: $sensor_id) {
    created_on
    customer_id
    fill_percentage
    sensor_id
    reports
  }
}
`;
export const listSensors = `query ListSensors(
  $filter: TableSensorFilterInput
  $limit: Int
  $nextToken: String
) {
  listSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      created_on
      customer_id
      fill_percentage
      sensor_id
      reports
    }
    nextToken
  }
}
`;
