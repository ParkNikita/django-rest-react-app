import React from 'react';
import TweetService from '../API/TweetService';

import MyButton from './UI/button/MyButton';
import { Link } from 'react-router-dom';

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
        <div className='text-[15px] p-3 m-10 border-2 border-grey-500 border-opacity-100'>
            {props.tweet.user === localStorage.getItem('username')
            ?<Link className='font-bold' to={`myprofile`}> @{props.tweet.user}</Link>
            :<Link className='font-bold' to={`profile/${props.tweet.user}`}> @{props.tweet.user}</Link>
            }
            
            {props.tweet.is_retweet 
            ? 
            <div>
                <div className='text-[15px] p-3 mb-5 mt-5 border-2 border-grey-500 border-opacity-100'>
                <h2>Retweet</h2>
                {props.tweet.parent.username === localStorage.getItem('username')
                    ?<Link className='font-bold' to={`profile/`}>@{props.tweet.parent.username}</Link>
                    :<Link className='font-bold' to={`profile/${props.tweet.parent.username}`}>@{props.tweet.parent.username}</Link>
                }
                
                <div className='text-[15px] p-3 m-2'>
                {props.tweet.content} 
                </div>
                <div className='btn mt-5'>
                    <MyButton action={'like'} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                        {props.tweet.parent}
                    </MyButton>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            View
                        </span>
                    </button>
                </div>
                </div>
            </div>
            :
            <div className='text-[15px] p-3 m-2'>
                {props.tweet.content}
            </div>
            }
            
            <div className='btn'>
                <MyButton action={'like'} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                    {props.tweet}
                </MyButton>
                <button onClick={retweet} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Retweet
                    </span>
                </button>
            </div>
        </div>
    );
};

export default TweetItem;