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
        store.login(username, password)
        setUsername('')
        setPassword('')
        if (store.isAuth) {
            navigate('tweets/')
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



// class Login extends Component {

//     state = {
//         credentials : {username: '', password: '', email: ''}
//     }

//     inputChanged = event => {
//         const cred = this.state.credentials;
//         cred[event.target.name] = event.target.value;
//         this.setState({credentials: cred});
//     }

//     login = event => {
//         fetch('http://127.0.0.1:8000/api/auth/token/login/', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(this.state.credentials)
//         }).then(
//             data => {
//                 console.log(data)
//             }
//         ).catch( error => console.log(error))
//     }

//     registration = event => {
//         fetch('http://127.0.0.1:8000/api/auth/users/', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(this.state.credentials)
//         }).then(
//             data => {
//                 console.log(data)
//             }
//         ).catch( error => console.log(error))
//     }


//     render() {
//         return (
//             <div>
//                 <h1>Login</h1>

//                 <label for="">
//                     Username:
//                     <input type="text" name="username"
//                      value={this.state.credentials.username}
//                      onChange={this.inputChanged}/>
//                 </label>
//                     <br/>
//                 <label for="">
//                     Password:
//                     <input type="password" name="password" 
//                      value={this.state.credentials.password}
//                      onChange={this.inputChanged}/>
//                 </label>
//                 <label for="">
//                     email:
//                     <input type="email" name="email" 
//                      value={this.state.credentials.email}
//                      onChange={this.inputChanged}/>
//                 </label>

//                 <button onClick={this.login}>Login</button>
//                 <button onClick={this.registration}>Registration</button>

//             </div>
//         )
//     }
// }

