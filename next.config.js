require('dotenv').config()

const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  },
  serverRuntimeConfig: {
    awsProjectRegion: process.env.AWS_PROJECT_REGION,
    aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.AWS_COGNITO_REGION,
    aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID
  },
  publicRuntimeConfig: {
    deviceApi: process.env.DEVICE_API
  }
}
