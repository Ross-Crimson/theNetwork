<script setup>
import { onMounted, ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const accountData = ref({
    name: '',
    email: '',
    picture: '',
    bio: '',
    coverImg: '',
    github: '',
    linkedin: '',
    resume: '',
    class: '',
    graduated: '',
})

onMounted(() => accountData.value = { ...AppState.account })

async function saveAccount() {
    try {
        await accountService.updateAccount(accountData.value)
        Pop.toast("Account Upddated", 'success')
    }
    catch (error) {
        Pop.error("Could not update account ", error);
    }
}

</script>


<template>
    <section class="container">
        <form class="row justify-content-center align-items-center" @submit.prevent="saveAccount()">
            <div class="col-4 mt-3">
                <label for="account-name">Name</label>
                <input v-model="accountData.name" class="form-control" type="text" id="account-name" minlength="3"
                    required maxlength="100">
            </div>
            <div class="col-4 mt-3">
                <label for="account-email">Email</label>
                <input v-model="accountData.email" class="form-control" type="email" id="account-email" minlength="3"
                    lowercase="true" maxlength="500">
            </div>
            <div class="col-6 mt-3">
                <label for="account-picture">Picture</label>
                <input v-model="accountData.picture" class="form-control" type="url" id="account-picture" minlength="3"
                    maxlength="500">
            </div>
            <div class="col-6 mt-3">
                <label for="account-coverImg">Cover Image</label>
                <input v-model="accountData.coverImg" class="form-control" type="url" id="account-coverImg"
                    maxlength="500">
            </div>
            <div class="col-6 mt-3">
                <label for="account-bio">Bio</label>
                <input v-model="accountData.bio" class="form-control" type="text" id="account-bio" maxlength="1000">
            </div>
            <div class="col-6 mt-3">
                <label for="account-github">GitHub</label>
                <input v-model="accountData.github" class="form-control" type="url" id="account-github" maxlength="500">
            </div>
            <div class="col-6 mt-3">
                <label for="account-linkedin">LinkedIn</label>
                <input v-model="accountData.linkedin" class="form-control" type="url" id="account-linkedin"
                    maxlength="500">
            </div>
            <div class="col-6 mt-3">
                <label for="account-resume">Resume</label>
                <textarea v-model="accountData.resume" class="form-control" name="account-resume" id="account-resume"
                    cols="30" rows="5" maxlength="500"></textarea>
            </div>

            <div class="col-3 mt-3">
                <input v-model="accountData.graduated" class="form-check-input" type="checkbox" id="account-graduated">
                <label for="account-graduated">Graduated</label>
            </div>
            <div class="col-3 mt-3">
                <label for="account-class">Class</label>
                <input v-model="accountData.class" class="form-control" type="text" id="account-class" maxlength="1000">
            </div>

            <div class="col-12 text-end mb-3">
                <button class="btn btn-primary m-3" type="submit">Save <i class="mdi mdi-floppy"></i></button>
            </div>
        </form>
    </section>
</template>


<style lang="scss" scoped></style>