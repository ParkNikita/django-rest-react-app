import api from "../http";
import axios from "axios";


export default class AuthService {
    static async login(username, password) {
        return api.post('token/', {username, password})
    }

    static async registration(email, username, password) {
        return axios.post('http://127.0.0.1:8000/api/register/', {email, username, password})
    }

}