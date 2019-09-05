// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSensor = `subscription OnCreateSensor {
  onCreateSensor {
    created_on
    updated_on
    customer_id
    fill_percentage
    sensor_id
    reports
    bin_location
    bin_type
    min_distance
    max_distance
    latitude
    longitude
    firmware_version
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
    updated_on
    customer_id
    fill_percentage
    sensor_id
    reports
    bin_location
    bin_type
    min_distance
    max_distance
    latitude
    longitude
    firmware_version
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
    updated_on
    customer_id
    fill_percentage
    sensor_id
    reports
    bin_location
    bin_type
    min_distance
    max_distance
    latitude
    longitude
    firmware_version
  }
}
`;
