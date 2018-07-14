import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropsRoute from './PropsRoute'

const GenerateRoutes = ({ routes, rootPath, data }) => {
  let r = routes.map(({ exact, path, component }, i) => {
    if (typeof (data) === 'object') {
      return (
        <PropsRoute
          exact={exact}
          component={component}
          key={i}
          data={data}
          path={
            typeof (rootPath) === "string"
              ? path === '/'
                ? rootPath
                : rootPath + path
              : path
          } />
      )
    }
    else {
      return (
        <Route
          exact={exact}
          component={component}
          key={i}
          path={
            typeof (rootPath) === "string"
              ? path === '/'
                ? rootPath
                : rootPath + path
              : path
          } />
      )
    }
  });

  return (
    <Switch>
      {r}
    </Switch>
  )
}

export default GenerateRoutes
