import React from 'react';
import TweetItem from './TweetItem';

const TweetList = ({tweets, create}) => {
    
    return (
        <div className='px-20'>
            {tweets.map(tweet=> 
                <TweetItem
                create={create}
                tweet={tweet}
                key={tweet.id}
                />
                )}
        </div>
    );
};

export default TweetList;