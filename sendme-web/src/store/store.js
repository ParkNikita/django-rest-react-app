import {makeAutoObservable} from 'mobx';
import AuthService from '../API/AuthService';
import axios from 'axios';


export default class Store {
    isAuth = false;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh-token', response.data.refresh);
            localStorage.setItem('username', username)
            this.setAuth(true);
        } catch (e) {
            alert(e.response.data.detail);
        }
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('username');
        this.setAuth(false);

    }

    async registration(email, username, password) {
        try {
            await AuthService.registration(email, username, password);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {refresh: localStorage.getItem('refresh-token')})
            localStorage.setItem('token', response.data.access);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            this.setLoading(false)
        }
    }
  
}