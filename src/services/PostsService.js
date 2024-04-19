import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Bonus } from "../models/Bonus.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"



class PostsService {
    async getProfileById(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        console.log(response.data)
        const profile = new Profile(response.data)
        AppState.activeProfile = profile
    }
    async getPosts() {
        const response = await api.get('api/posts')
        console.log(response.data)
        const newPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
    }

    async getBonuses() {
        const response = await api.get('api/ads')
        //console.log("📰", response.data)
        const newBonuses = response.data.map(bonus => new Bonus(bonus))
        AppState.bonuses = newBonuses
    }
}

export const postsService = new PostsService