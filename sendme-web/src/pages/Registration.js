import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../API/AuthService';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import MyLabel from '../components/UI/label/MyLabel';

const Registration = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const submit = async function (e) {
        e.preventDefault()
        try {
            const response = await AuthService.registration(email, username, password)
            setEmail('')
            setUsername('')
            setPassword('')
            navigate('/login')

        } catch (error) {
            console.log(error)
            alert(error)
        }

    }

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
            <MyButton onClick={submit}>register</MyButton>

        </div>


    )
}

export default observer(Registration);
