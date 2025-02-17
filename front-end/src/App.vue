<script setup>
import { RouterView } from 'vue-router';
import backgroundImage from "@/assets/img/background.jpg"


</script>

<template>
    <div class="image" :style="{ backgroundImage: `url(${backgroundImage})`}">

  <RouterView />
  </div>

</template>
<style>
.image {

min-height: 95vh;
background-size: cover;
background-position: center;
padding-top: 10px;
border-radius: 12px;
}
</style>
