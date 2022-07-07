import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Tweets from "../pages/Tweets"


export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
    {path: '*', component: <Tweets/>, exact: true},

]