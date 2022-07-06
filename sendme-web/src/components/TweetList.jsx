import React from 'react';
import TweetItem from './TweetItem';

const TweetList = ({tweets}) => {

    return (
        <div className='px-20'>
            {tweets.map(tweet=> 
                <TweetItem
                tweet={tweet}
                key={tweet.id}
                />
                )}
        </div>
    );
};

export default TweetList;