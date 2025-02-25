<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/stores/userstore";
const userStore=useUserStore();

const products = ref([]);
const errorMessage = ref(null);

async function fetchProduct() {
  try {
    let response = await fetch("http://localhost:8000/api/product");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    let data = await response.json();
    products.value = data.map(product => ({
      ...product,
      imageUrl: product.itempicturenumber ? `http://localhost:8000/uploads/images/${product.itempicturenumber}` : null
    }));

  } catch (error) {
    console.error("Error fetching products:", error);
    errorMessage.value = "Failed to load products. Please try again.";
  }
}

// Function to delete a product
async function deleteProduct(itemname) {

  try {
    let response = await fetch(`http://localhost:8000/api/product/${itemname}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    products.value = products.value.filter(product => product.itemname !== itemname);
  } catch (error) {
    console.error("Error deleting product:", error);
    errorMessage.value = "Failed to delete product. Please try again.";
  }
}

onMounted(fetchProduct);
onMounted(() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
});

</script>

<template>
      <div v-if="userStore.user">

  <div class="container">
    <h1>Product List</h1>

    <table v-if="products.length > 0" class="product-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Purchase Price</th>
          <th>Selling Price</th>
          <th>Stock</th>
          <th>Picture</th>
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.itemname }}</td>
          <td>{{ product.purchaseprice }}</td>
          <td>{{ product.sellingprice }}</td>
          <td>{{ product.iteminstock }}</td>
<td>
  <img v-if="product.imageUrl" :src="product.imageUrl" alt="Product Image" class="product-image" />
  <span v-else>No Image</span>
</td>         <td>
          <RouterLink :to="`/editproduct/${product.itemname}`">
  <button class="btn">Update</button>
</RouterLink>
</td>
          <td><button class="btn delete" @click="deleteProduct(product.itemname)">Delete</button></td>

        </tr>
      </tbody>
    </table>

    <p v-else>No products available.</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
      </div>
</template>

<style>
.product-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 1px;
  background: rgba(207, 207, 207, 0.7);
}

.container {
  width: 80%;
  margin: auto;
  text-align: center;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th, .product-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.product-table th {
  background: #333;
  color: white;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}

.btn {
  padding: 5px 10px;
  cursor: pointer;
}


</style>
