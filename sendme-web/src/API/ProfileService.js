import api from "../http";


export default class ProfileService {
    static async myProfile() {
        const response = await api.get(`profiles/${localStorage.getItem('username')}/`)
        return response

    }

    static async getAllProfiles() {
        const response = await api.get('profiles/')
        return response
    }

    static async Profile(username) {
        const response = await api.get(`profiles/${username}/`)
        return response

    }

    static async myTweets() {
        const response = await api.get(`profiles/${localStorage.getItem('username')}/tweets/`)
        return response

    }

    static async Tweets(username) {
        const response = await api.get(`profiles/${username}/tweets/`)
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

    static async Follow(username, tofollowuser) {
        const response = await api.post(`profiles/${username}/follow/`, {"username": tofollowuser})
        return response

    }

    static async UnFollow(username, tounfollowuser) {
        const response = await api.post(`profiles/${username}/unfollow/`, {"username": tounfollowuser})
        return response

    }


}