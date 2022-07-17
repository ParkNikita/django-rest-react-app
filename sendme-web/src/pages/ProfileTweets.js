import ProfileService from "../API/ProfileService";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching"
import { useParams } from "react-router-dom";
import TweetList from "../components/TweetList";
import MyLoader from "../components/UI/loader/MyLoader";

const ProfileTweets = () => {
    let {username} = useParams();
    const [tweets, setTweets] = useState([])

    const [fetchTweets, isTweetsLoading, tweetError] = useFetching( async() => {
        const response = await ProfileService.Tweets(username)
        setTweets([...tweets, ...response.data])
    })

    useEffect( () => {
        fetchTweets()

    }, [])


    return (
        <div>
            <div className="flex justify-center my-10 text-4xl font-medium text-black-400">
                {username}'s tweets 
            </div>
            {tweetError &&
                <div>Error {tweetError}</div>
            }

            {isTweetsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader/></div>
            }   
            <TweetList tweets={tweets}/>
        </div>
    )
}


export default ProfileTweets;