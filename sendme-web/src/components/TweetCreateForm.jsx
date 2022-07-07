import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';

import MyButton from '../components/UI/button/MyButton';

import TweetService from '../API/TweetService';

const TweetCreateForm = ({create}) => {
    const [content, setContent] = useState('')
    const loadtweet = async function (e) {
        e.preventDefault()
        const  response = await TweetService.createTweet(content)
        const newTweet = {
            ...response.data
        }
        create(newTweet)
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
