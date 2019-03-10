import Dashboard from '../containers/Dashboard'
import RealTime from '../containers/RealTime'
import Login from '../containers/Login'
import Demo from '../containers/Demo';
import Map from '../containers/Map';

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
    },
    {
        path: '/demo',
        component: Demo,
        exact: false
    },
    {
        path: '/map',
        component: Map,
        exact: false
    }
]

export default routes
