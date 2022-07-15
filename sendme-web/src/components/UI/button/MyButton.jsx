import React, {useState, useContext} from 'react';
import classes from './MyButton.module.css'
import { useNavigate } from 'react-router-dom';

import TweetService from '../../../API/TweetService';
import { Context } from '../../..';



const MyButton = function ({children, action, ...props}) {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const [likes, setLikes] = useState(children.likes)
    const [userLike, setUserLike] = useState(false)

    const handleDidLike = function (event) {
        event.preventDefault()
        if (userLike === true && store.isAuth) {
            TweetService.actionTweet(children.id, 'unlike', children.content)
            setLikes(likes - 1)
            setUserLike(false)
            this.removeClass('active')
        }
        if (userLike === false && store.isAuth) {
            TweetService.actionTweet(children.id, 'like', children.content)
            setLikes(children.likes + 1)
            setUserLike(true)
            this.addClass('active')
        }   
        if (!store.isAuth) {
            navigate('/login')
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

