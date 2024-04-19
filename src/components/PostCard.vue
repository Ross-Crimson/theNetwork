<script setup>
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

defineProps({ post: { type: Post, required: true } })


async function deletePost() {

}

</script>


<template>
    <section class="shadow p-2 mx-2 my-4">
        <div class="row pt-2">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex px-2">
                    <RouterLink :to="{ name: 'Profile', params: { profileId: post.creatorId } }" class="profile pt-2">
                        <img :src="post.creator.picture" alt="" class="">
                    </RouterLink>

                    <div class="px-2">
                        <div>{{ post.creator.name }}</div>
                        <div>{{ post.createdAt.toLocaleDateString() }}</div>
                    </div>
                </div>

                <!-- Note Delete Button hide if post not owned -->
                <div v-if="account?.id == post?.creatorId">
                    <button class="btn btn-danger" @click="deletePost()"><i class="mdi mdi-delete-outline"></i></button>
                </div>

            </div>
        </div>
        <div class="row pt-3 px-3">
            <div>
                {{ post.body }}
            </div>
            <div v-if="post.imgUrl" class="text-center pt-3 pb-1">
                <img :src="post.imgUrl" alt="" class="postPicture">
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

.postPicture {
    max-width: 300px;
    height: auto;
}
</style>