import Dashboard from '../containers/Dashboard'
import RealTime from '../containers/RealTime'
import Login from '../containers/Login'
import TechCrunch2018 from '../containers/TechCrunch2018';

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
        path: '/tech',
        component: TechCrunch2018,
        exact: false
    }
]

export default routes
