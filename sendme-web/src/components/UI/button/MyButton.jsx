import React, {useState} from 'react';
import classes from './MyButton.module.css'
import TweetService from '../../../API/TweetService';

const MyButton = function ({children, action, ...props}) {


    const [likes, setLikes] = useState(children.likes)
    const [userLike, setUserLike] = useState(false)
    const handleDidLike = function (event) {
        event.preventDefault()
        if (userLike === true) {
            TweetService.actionTweet(children.id, 'unlike', children.content)
            setLikes(likes - 1)
            setUserLike(false)
        }
        else{
            TweetService.actionTweet(children.id, 'like', children.content)
            setLikes(children.likes + 1)
            setUserLike(true)
        }

    }

    if (action == 'like') {
        return (
            <button onClick={handleDidLike} {...props}>
                {likes} Likes
            </button>

        )
        
    }


    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
}

export default MyButton;

