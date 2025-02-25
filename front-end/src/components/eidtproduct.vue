<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userstore";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref({});
    const apiUrl = `http://localhost:8000/api/product/${route.params.itemname}`;
const userStore=useUserStore();


    async function fetchProduct() {
      try {
        const response = await axios.get(apiUrl);
        product.value = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    // Update product
    async function updateProduct() {
      try {
        await axios.put(apiUrl, product.value);
        alert("Product updated successfully!");
        router.push("/showproduct");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }

    onMounted(fetchProduct,() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
});

    return { product, updateProduct };
  },

};
</script>

<template>

    <div class="form-card-pro  " >

<h1 style="text-align: center; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ;"> Update PRODUCTS IN FRESHhut </h1>
<h2 style="text-align: left; padding: 10PX;"> update Product</h2>

<form @submit.prevent="updateProduct">
  <div class="form-group-pro">
    <input v-model="product.itemname" type="text" placeholder="update itemname" />
  </div>
  <div class="form-group-pro">
    <input v-model="product.purchaseprice" type="number" placeholder="update purchaseprice" />
  </div>
   <div class="form-group-pro">
    <input v-model="product.sellingprice" type="number" placeholder="update sellingprice" />
  </div>
      <div class="form-group-pro">
    <input v-model="product.iteminstock" type="number" placeholder="update iteminstock" />
  </div>
      <div class="form-group-pro">

        <input type="file" accept=".jpg,.jpeg" @change="handleFileSelect" />
      </div>
  <button type="submit" class="btn-pro">Update product</button>

</form>


</div>
</template>


<style>
.image{

min-height: 95vh;
background-size: cover;
background-position: center;
padding-top: 10px;
border-radius: 12px;
}



</style>
