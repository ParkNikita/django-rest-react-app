import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';

import MyButton from '../components/UI/button/MyButton';

import TweetService from '../API/TweetService';

const TweetCreateForm = ({}) => {
    const [content, setContent] = useState('')
    const loadtweet = function (e) {
        e.preventDefault()
        TweetService.createTweet(content)
        TweetService.getAll()
    }

    return (

        <div className="flex justify-center my-10">
            <div className="flex flex-col w-1/4 border border-grey-500 border-opacity-100">
            
                <textarea
                className='mb-5 border border-black border-opacity-1000'
                    onChange={e => setContent(e.target.value)}
                    type="text"
                    name="content"
                    value={content}
                />

                <MyButton onClick={loadtweet}>Create</MyButton>
                

            </div>
        </div>
        



    )
    
}

export default observer(TweetCreateForm);
