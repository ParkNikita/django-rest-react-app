import api from "../http";


export default class ProfileService {
    static async myProfile() {
        const response = await api.get(`profiles/${localStorage.getItem('username')}/`)
        return response

    }

    static async myTweets() {
        const response = await api.get(`profiles/${localStorage.getItem('username')}/tweets/`)
        return response

    }

    static async updateProfile(nickname, bio, location, first_name, last_name, date_of_birth) {
        try{
            const response = await api.put(`profiles/${localStorage.getItem('username')}/update/`, {nickname, bio, location, first_name, last_name, date_of_birth})
            return response
        } catch (e) {
            console.log(e.response?.data?.message)
        }   
        
    }


}