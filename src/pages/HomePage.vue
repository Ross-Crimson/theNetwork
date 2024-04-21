<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import BonusCard from '../components/BonusCard.vue';
import NewPostCard from '../components/NewPostCard.vue';
import SearchBar from '../components/SearchBar.vue';

const userPosts = computed(() => AppState.posts)
const bonusContent = computed(() => AppState.bonuses)
const searchTerm = computed(() => AppState.searchTerm)

onMounted(() => getPosts())
onMounted(() => getBonuses())

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getBonuses() {
  try {
    await postsService.getBonuses()
  } catch (error) {
    Pop.error(error)
  }
}

async function changeSearchPage(pageNum) {
  try {
    await postsService.changeSearchPage(`api/posts?page=${pageNum}`)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function clearSearch() {
  try {
    await postsService.clearSearch()
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-2">

      </div>

      <div class="col-8">
        <div>
          <SearchBar />

          <div v-if="searchTerm" class="mt-3 d-flex align-items-center">
            <button class="btn btn-warning " @click="clearSearch()">Clear Search</button>
            <div class="text-break px-2 mx-2 text-info border border-dark rounded">{{ searchTerm }}</div>
          </div>

          <NewPostCard />
        </div>

        <PostCard v-for="post in userPosts" :key="post.id" :post="post" />

        <!-- Note change page buttons -->
        <div class="d-flex justify-content-between p-3">
          <button :disabled="AppState.currentPage == 1" class="btn btn-primary w-25 text-center"
            @click="changeSearchPage(AppState.currentPage - 1)">Previous</button>

          <h4>{{ AppState.currentPage }}</h4>

          <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-primary w-25"
            @click="changeSearchPage(AppState.currentPage + 1)">Next</button>
        </div>
      </div>

      <div class="col-2">
        <BonusCard v-for="bonus in bonusContent" :key="bonus.title" :bonus="bonus" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
