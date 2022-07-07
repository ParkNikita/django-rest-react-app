import { useFetching } from "../hooks/useFetching"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import MyLoader from "../components/UI/loader/MyLoader"
import TweetList from "../components/TweetList"
import TweetService from "../API/TweetService"
import TweetCreateForm from "../components/TweetCreateForm"

const Tweets = () => {

    const [tweets, setTweets] = useState([])

    const [fetchTweets, isTweetsLoading, tweetError] = useFetching( async() => {
        const response = await TweetService.getAll()
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
                Welcome to Sendme 
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

export default observer(Tweets);