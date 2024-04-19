<script setup>
import { computed, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

const newPostData = ref({
    body: '',
    imgUrl: '',
})

async function createPost() {
    try {
        await postsService.createPost(newPostData.value)

        newPostData.value = {
            body: '',
            imgUrl: ''
        }
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <section v-if="account" class="container">
        <div class="row">
            <div class="my-3 p-3 shadow">


                <form @submit.prevent="createPost()">
                    <textarea v-model="newPostData.body" class="form-control" placeholder="Make a new post." name="body"
                        id="body" cols="30" rows="5" required="true" maxLength="5000"></textarea>
                    <!-- <label for="body">New Post</label> -->

                    <div class="d-flex">
                        <input v-model="newPostData.imgUrl" type="url" class="form-control" id="imgUrl"
                            placeholder="Image/gif url here" maxlength="500">
                        <button class="btn btn-primary" type="submit">Post<i
                                class="mdi mdi-send-variant-outline"></i></button>
                    </div>
                </form>

            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>