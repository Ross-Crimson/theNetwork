import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Bonus } from "../models/Bonus.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"



class PostsService {
    async changeSearchPage(url) {
        const response = await api.get(url)
        const newPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
        console.log(response.data)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
        console.log(AppState.currentPage, ' ', AppState.totalPages)
    }

    async getProfileById(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        //console.log(response.data)
        const profile = new Profile(response.data)
        AppState.activeProfile = profile
    }

    async getProfilePosts(profileId) {
        AppState.posts = []
        const response = await api.get(`api/profiles/${profileId}/posts`)
        const profilePosts = response.data.posts.map(post => new Post(post))
        AppState.posts = profilePosts
        console.log(response.data)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
        console.log(AppState.currentPage, ' ', AppState.totalPages)
    }

    async getPosts() {
        AppState.posts = []
        const response = await api.get('api/posts')
        const newPosts = response.data.posts.map(post => new Post(post))
        console.log(response.data.posts)
        AppState.posts = newPosts

        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async getBonuses() {
        const response = await api.get('api/ads')
        //console.log("📰", response.data)
        const newBonuses = response.data.map(bonus => new Bonus(bonus))
        AppState.bonuses = newBonuses
    }
}

export const postsService = new PostsService