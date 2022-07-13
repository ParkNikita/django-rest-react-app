import React from 'react';
import TweetService from '../API/TweetService';

import MyButton from './UI/button/MyButton';



const TweetItem = (props) => {

    const retweet = async function (e) {
        e.preventDefault()
        const response = await TweetService.actionTweet(props.tweet.id, 'retweet', props.tweet.content)
        
        const newTweet = {
            ...response.data
        }
        props.create(newTweet)
    }


    return (
        <div className='text-[15px] p-3 mb-5 border-2 border-grey-500 border-opacity-100'>
            <h1 className='font-bold'> {props.tweet.user ? props.tweet.user : "You"}</h1>
            <p>{props.tweet.content}</p>

            <div className='btn'>
                <MyButton action={'like'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 px-3'>{props.tweet}</MyButton>
                <button onClick={retweet} className='bg-white text-green-500 hover:bg-green-500 hover:text-white border border-grey border-opacity-1000 font-bold py-2 px-3'>Retweet</button>
                
            </div>


        </div>
    );
};

export default TweetItem;