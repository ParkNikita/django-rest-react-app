import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Tweets from "../pages/Tweets"
import MyProfile from "../pages/MyProfile"
import MyTweets from "../pages/MyTweets"
import CheckProfile from "../pages/CheckProfile"


export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
    {path: '/:username', component: <CheckProfile/>, exact: true},
    {path: '/profile', component: <MyProfile/>, exact: true},
    {path: '/me', component: <MyTweets/>, exact: true},
    {path: '*', component: <Tweets/>, exact: true},

]