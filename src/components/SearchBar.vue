<script setup>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';

const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)


</script>


<template>
    <section>

    </section>
</template>


<style lang="scss" scoped></style>