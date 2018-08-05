import Dashboard from '../containers/Dashboard'
import RealTime from '../containers/RealTime'
import Login from '../containers/Login'

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true
  },
  {
    path: '/realtime',
    component: RealTime,
    exact: false
  },
  {
    path: '/auth',
    component: Login,
    exact: false
  }
]

export default routes
