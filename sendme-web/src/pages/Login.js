import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import MyLabel from '../components/UI/label/MyLabel';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate();

    const submitLogin = async function (e) {
        e.preventDefault()
        const response = await store.login(username, password)
        setUsername('')
        setPassword('')
        console.log(response)
        if (response.status === 200) {
            navigate('/tweets')
        } 


    }

    return (

        <div className='login-page'>
            <MyLabel for="username">Username</MyLabel>
            <MyInput
                onChange={e => setUsername(e.target.value)}
                type="text"
                name="username"
                value={username}
            />
            <MyLabel for="password">Password</MyLabel>
            <MyInput
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
            />
            <MyButton onClick={submitLogin}>Login</MyButton>
        </div>
    )
}

export default observer(Login);
