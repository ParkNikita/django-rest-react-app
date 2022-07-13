import ProfileService from "../API/ProfileService";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching"
import TweetCreateForm from "../components/TweetCreateForm";
import TweetList from "../components/TweetList";
import MyLoader from "../components/UI/loader/MyLoader";

const MyTweets = () => {

    const [tweets, setTweets] = useState([])

    const [fetchTweets, isTweetsLoading, tweetError] = useFetching( async() => {
        const response = await ProfileService.myTweets()
        setTweets([...tweets, ...response.data])
        
    })

    useEffect( () => {
        fetchTweets()

    }, [])

    const createTweet = function (newTweet) {
        setTweets([newTweet, ...tweets])
      }


    return (
        <div>
            <div className="flex justify-center my-10 text-4xl font-medium text-black-400">
                My Tweets 
            </div>
            {tweetError &&
                <div>Error {tweetError}</div>
            }
            <TweetCreateForm create={createTweet} />
            {isTweetsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader/></div>
            }   
            <TweetList tweets={tweets} create={createTweet}/>

        </div>
    )
}


export default MyTweets;