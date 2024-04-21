import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Bonus } from "../models/Bonus.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"



class PostsService {
    async clearSearch() {
        AppState.searchTerm = ''
        await this.getPosts()
    }

    async clearSearchOnProfilePage(profileId) {
        AppState.searchTerm = ''
        await this.getProfilePosts(profileId)
    }
    async searchPosts(searchQuery) {
        const response = await api.get(`api/posts?query=${searchQuery}`)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.searchTerm = searchQuery
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async likePost(postId) {
        const response = await api.post(`api/posts/${postId}/like`)

        const updatedPost = new Post(response.data)
        console.log(updatedPost)
        const posts = AppState.posts
        const postIndex = posts.findIndex(post => post.id == postId)

        if (postIndex == -1) throw new Error("Post wasn't updated")

        posts.splice(postIndex, 1, updatedPost)
    }
    async destroyPost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        const posts = AppState.posts
        const postIndex = posts.findIndex(post => post.id == postId)
        if (postIndex == -1) throw new Error("Post wasn't deleted, couldn't be found")
        posts.splice(postIndex, 1)
    }
    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        console.log('new post', response.data)
        const newPost = new Post(response.data)
        AppState.posts.unshift(newPost)
    }

    async changeSearchPage(url) {
        const response = await api.get(url)
        const newPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
        //console.log(response.data)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
        //console.log(AppState.currentPage, ' ', AppState.totalPages)
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
        //console.log(response.data)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
        //console.log(AppState.currentPage, ' ', AppState.totalPages)
    }

    async getPosts() {
        AppState.posts = []
        const response = await api.get('api/posts')
        const newPosts = response.data.posts.map(post => new Post(post))
        //console.log(response.data.posts)
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