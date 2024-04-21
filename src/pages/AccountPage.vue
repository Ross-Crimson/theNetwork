<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import AccountForm from '../components/AccountForm.vue';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>{{ account.name }}</h1>

      <div class="d-flex justify-content-center flex-column align-items-center">
        <img class="rounded" :src="account.picture" alt="" />
        <img class="rounded img-fluid" :src="account.coverImg" alt="" />
      </div>

      <p>{{ account.email }}</p>
      <AccountForm />
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
