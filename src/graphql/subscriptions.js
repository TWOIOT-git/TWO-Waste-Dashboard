// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSensor = `subscription OnCreateSensor(
  $created_on: AWSTimestamp
  $customer_id: String
  $fill_percentage: Float
  $sensor_id: ID
  $reports: String
) {
  onCreateSensor(
    created_on: $created_on
    customer_id: $customer_id
    fill_percentage: $fill_percentage
    sensor_id: $sensor_id
    reports: $reports
  ) {
    created_on
    customer_id
    fill_percentage
    sensor_id
    reports
  }
}
`;
export const onDeleteSensor = `subscription OnDeleteSensor(
  $created_on: AWSTimestamp
  $customer_id: String
  $fill_percentage: Float
  $sensor_id: ID
  $reports: String
) {
  onDeleteSensor(
    created_on: $created_on
    customer_id: $customer_id
    fill_percentage: $fill_percentage
    sensor_id: $sensor_id
    reports: $reports
  ) {
    created_on
    customer_id
    fill_percentage
    sensor_id
    reports
  }
}
`;
export const onUpdateSensor = `subscription OnUpdateSensor(
  $created_on: AWSTimestamp
  $customer_id: String
  $fill_percentage: Float
  $sensor_id: ID
  $reports: String
) {
  onUpdateSensor(
    created_on: $created_on
    customer_id: $customer_id
    fill_percentage: $fill_percentage
    sensor_id: $sensor_id
    reports: $reports
  ) {
    created_on
    customer_id
    fill_percentage
    sensor_id
    reports
  }
}
`;
