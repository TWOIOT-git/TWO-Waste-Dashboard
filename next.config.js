require('dotenv').config()

const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    if(process.env.NODE_ENV !== "production") {
      config.plugins.push(
        new webpack.EnvironmentPlugin(process.env)
      )
    }
    return config
  }
}
