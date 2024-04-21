<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import BonusCard from '../components/BonusCard.vue';
import PostCard from '../components/PostCard.vue';
import NewPostCard from '../components/NewPostCard.vue';
import SearchBar from '../components/SearchBar.vue';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const bonusContent = computed(() => AppState.bonuses)
const searchTerm = computed(() => AppState.searchTerm)

onMounted(() => getProfileById())
//onMounted(() => getProfileBlogPosts())
onMounted(() => getBonuses())

async function getProfileById() {
    try {
        await postsService.getProfileById(route.params.profileId)
        await getProfileBlogPosts()
    } catch (error) {
        Pop.error(error)
    }
}
async function getBonuses() {
    try {
        await postsService.getBonuses()
    } catch (error) {
        Pop.error(error)
    }
}
async function getProfileBlogPosts() {
    try {
        await postsService.getProfilePosts(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function changeSearchPage(pageNum) {
    try {
        console.log(pageNum)
        await postsService.changeSearchPage(`api/profiles/${route.params.profileId}/posts?page=${pageNum}`)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function clearSearch() {
    try {
        await postsService.clearSearchOnProfilePage(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section class="container">
        <div class="row justify-content-end">
            <div v-if="profile" class="col-8">
                <div class="row">
                    <img :src="profile.coverImg" alt="" class="coverImg">
                </div>
                <div class="row">
                    <div class="d-flex justify-content-between align-">
                        <div class="profile px-3">
                            <img :src="profile.picture" alt="">
                            <div style="transform: translate(-28px, 11px);">
                                <div v-if="profile.graduated == true"><i class="mdi mdi-account-school fs-2"></i></div>
                                <div v-else><i class="mdi mdi-account fs-2"></i></div>
                            </div>
                        </div>
                        <div class="py-2 px-3">
                            <a v-if="profile.github" :href="profile.github" target="_blank"><i
                                    class="mdi mdi-github fs-2"></i></a>
                            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i
                                    class="mdi mdi-linkedin fs-2"></i></a>
                            <a v-if="profile.resume" :href="profile.resume" target="_blank"><i
                                    class="mdi mdi-note-text-outline fs-2"></i></a>
                        </div>
                    </div>
                </div>
                <div class="row px-3">
                    <h5 class="text-info">{{ profile.class }}</h5>
                    <h2>{{ profile.name }}</h2>
                </div>
                <div class="row p-3">
                    <p class="">{{ profile.bio }}</p>
                    <div v-if="account?.id == profile?.id" class="text-end">
                        <router-link :to="{ name: 'Account' }">
                            <button class="btn btn-info">Edit</button>
                        </router-link>
                    </div>
                </div>
                <div>
                    <SearchBar />
                    <div v-if="searchTerm" class="mt-3 d-flex align-items-center">
                        <button class="btn btn-warning " @click="clearSearch()">Clear Search</button>
                        <div class="text-break px-2 mx-2 text-info border border-dark rounded">{{ searchTerm }}</div>
                    </div>
                </div>
                <div v-if="account?.id == profile?.id">
                    <NewPostCard />
                </div>

                <div v-if="posts">
                    <PostCard v-for="post in posts" :key="post.id" :post="post" />

                    <!-- Note change Page buttons -->
                    <div class="d-flex justify-content-between p-3">
                        <button :disabled="AppState.currentPage == 1" class="btn btn-primary w-25 text-center"
                            @click="changeSearchPage(AppState.currentPage - 1)">Previous</button>

                        <h4>{{ AppState.currentPage }}</h4>

                        <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-primary w-25"
                            @click="changeSearchPage(AppState.currentPage + 1)">Next</button>
                    </div>
                </div>
            </div>

            <div class="col-2">
                <BonusCard v-for="bonus in bonusContent" :key="bonus.title" :bonus="bonus" />
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.coverImg {
    height: 20dvh;
    object-fit: cover;
    object-position: center;
}

.profile {
    display: flex;
    align-items: center;

    img {
        height: 100px;
        aspect-ratio: 1/1;
        border-radius: 50em;
        object-fit: cover;
        object-position: center;
        transform: translate(0, -40px);
    }
}
</style>