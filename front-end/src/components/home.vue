<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userstore';

const userStore = useUserStore();

</script>
<template>
  <nav>
    <div v-if="userStore.user">
      <p>Welcome, {{ userStore.user.username }}!</p>
      <RouterLink @click="userStore.clearUser()">Logout</RouterLink>
      </div>
  </nav>
</template>
