<script setup>
import { useUserStore } from '@/stores/userstore';
import { RouterLink } from 'vue-router';
import { onMounted} from 'vue';
import router from '@/router';

const userStore = useUserStore();
onMounted(() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
});

</script>
<template>
    <div v-if="userStore.user">
      <div class="content-box-home" >
        <div class="left-box-home">
             <p style="text-align: center; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Products</p>
              <RouterLink   to="/productform"> <button type="submit" h class="btn">ADD PRODUCT</button></RouterLink>
              <RouterLink   to="/showproduct"> <button type="submit"  class="btn">show products</button></RouterLink>

             </div>

        <div class="right-box-home">
          <p style="text-align: center; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Billing</p>
          <RouterLink   to="/billing"> <button type="submit" class="btn">show bill</button></RouterLink>
          <RouterLink   to="/showbill"> <button type="submit"  class="btn">show ALL billS</button></RouterLink>

        </div>
      </div>
      </div>
</template>
<style>
.content-box-home {
  display: flex;
  flex: 1;
  width: 80%;
  box-shadow: inset;
  border-radius: 12px;
  margin: 100px;
  background: rgba(207, 207, 207, 0.2);
}
.left-box-home{

width: 50%;
  justify-content: center;
  align-items: center;
 color: rgb(7, 7, 7);
 border: 1px solid black;
 border-radius: 12px;
}
.right-box-home{

  width: 50%;
  justify-content: center;
  align-items: center;
 color: rgb(7, 7, 7);
 border: 1px solid black;
 border-radius: 12px;
 margin-left: 9px;
}
.form-home-card{
  padding:10px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-right: 100px;
}
</style>
