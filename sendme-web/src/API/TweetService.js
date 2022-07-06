import api from "../http";


export default class TweetService {
    static async getAll() {
        const response = await api.get('tweets/')
        return response

    }

    static async createTweet(content) {
        const response = await api.post('/tweets/create/', {content})
        return response

    }

    static async actionTweet(id, action, content) {
        const response = await api.post('/tweets/action/', {id, action, content})
        return response

    }

}


