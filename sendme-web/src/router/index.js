import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Tweets from "../pages/Tweets"
import MyProfile from "../pages/MyProfile"
import MyTweets from "../pages/MyTweets"
import CheckProfile from "../pages/CheckProfile"
import ProfileTweets from "../pages/ProfileTweets"

export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
    {path: '/profile/:username', component: <CheckProfile/>, exact: true},
    {path: 'profile/:username/tweets', component: <ProfileTweets/>, exact: true},
    {path: '/profile', component: <MyProfile/>, exact: true},
    {path: '/me', component: <MyTweets/>, exact: true},
    {path: '*', component: <Tweets/>, exact: true},

]