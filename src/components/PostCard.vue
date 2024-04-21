<script setup>
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const account = computed(() => AppState.account)

defineProps({ post: { type: Post, required: true } })


async function destroyPost(postId) {
    try {
        const wantToDestroy = await Pop.confirm("Are you sure you want to delete this post?")
        if (!wantToDestroy) return
        await postsService.destroyPost(postId)

    }
    catch (error) {
        Pop.error(error);
    }
}

async function likePost(postId) {
    try {
        await postsService.likePost(postId)
    }
    catch (error) {
        Pop.error(error);
    }
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
                    <button class="btn btn-danger" @click="destroyPost(post.id)"><i
                            class="mdi mdi-delete-outline"></i></button>
                </div>

            </div>
        </div>
        <div class="row pt-3 px-3">
            <p class="text-break">
                {{ post.body }}
            </p>
            <div v-if="post.imgUrl" class="text-center pt-3 pb-1">
                <img :src="post.imgUrl" alt="" class="postPicture">
            </div>
        </div>
        <div class="row pt-3 justify-content-end">
            <div class="col-2">
                <div v-if="account" @click="likePost(post.id)">
                    <div v-if="post.likeIds.includes(account.id)">
                        <i class="mdi mdi-heart"></i>{{ post.likeIds.length }}
                    </div>
                    <div v-else>
                        <i class="mdi mdi-heart-outline"></i>{{ post.likeIds.length }}
                    </div>

                </div>
                <div v-else>
                    <i class="mdi mdi-heart-outline"></i>{{ post.likeIds.length }}
                </div>
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