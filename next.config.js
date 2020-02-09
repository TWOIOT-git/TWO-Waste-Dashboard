const webpack = require('webpack')

const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass({
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  },
  env: {
    identityPoolId: process.env.identityPoolId
  }
}))
