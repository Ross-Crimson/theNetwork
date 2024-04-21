<script setup>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';

const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

async function searchPosts() {
    try {
        await postsService.searchPosts(searchQuery.value)
        searchQuery.value = ''
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section class="pt-3">
        <form @submit.prevent="searchPosts()">
            <div class="input-group">
                <input v-model="searchQuery" type="text" class="form-control" placeholder="search all posts..."
                    id="search-input" maxlength="20">
                <button type="submit" class="btn btn-info w-25"><i class="mdi mdi-magnify"></i></button>
            </div>
        </form>
    </section>
</template>


<style lang="scss" scoped></style>