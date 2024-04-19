<script setup>
import { Post } from '../models/Post.js';


defineProps({ post: { type: Post, required: true } })

</script>


<template>
    <section class="shadow p-2 mx-2 my-4">
        <div class="row pt-2">
            <div class="d-flex align-items-center">
                <RouterLink :to="{ name: 'Profile', params: { profileId: post.creatorId } }" class="profile">
                    <img :src="post.creator.picture" alt="" class="">
                </RouterLink>
                <div class="px-2">
                    <div>{{ post.creator.name }}</div>
                    <div>{{ post.createdAt.toLocaleDateString() }}</div>
                </div>
            </div>
        </div>
        <div class="row pt-3 px-3">
            <div>
                {{ post.body }}
            </div>
        </div>
        <div class="row pt-3 justify-content-end">
            <div class="col-2">
                <i class="mdi mdi-heart"></i>{{ post.likeIds.length }}
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.profile {
    display: flex;
    align-items: baseline;

    img {
        height: 35px;
        aspect-ratio: 1/1;
        border-radius: 50em;
        object-fit: cover;
        object-position: center
    }
}
</style>