import Dashboard from '../containers/Dashboard'
import Login from '../containers/Login'

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true
  },
  {
    path: '/auth',
    component: Login,
    exact: false
  }
]

export default routes
