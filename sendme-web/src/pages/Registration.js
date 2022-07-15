import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import MyLabel from '../components/UI/label/MyLabel';

const Registration = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate();

    return (

        <div className='registration-page'>
            <MyLabel for="email">Email</MyLabel>
            <MyInput
                onChange={e => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
            />
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
            <MyButton onClick={() => store.registration(email, username, password)}>register</MyButton>

        </div>


    )
}

export default observer(Registration);
