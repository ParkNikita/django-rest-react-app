import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Tweets from "../pages/Tweets"
import Profile from "../pages/Profile"
import MyTweets from "../pages/MyTweets"


export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
    {path: '/profile', component: <Profile/>, exact: true},
    {path: '/me', component: <MyTweets/>, exact: true},
    {path: '*', component: <Tweets/>, exact: true},

]