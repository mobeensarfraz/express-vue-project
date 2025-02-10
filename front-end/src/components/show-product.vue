<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const products = ref([]);
const errorMessage = ref(null);

async function fetchProduct() {
  try {
    let response = await fetch("http://localhost:8000/api/product");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    products.value = await response.json();
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
</script>

<template>
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
          <td>{{ product.itempicturenumber }}</td>
         <td>
          <RouterLink :to="`/editproduct/${product.itemname}`">
  <button class="btn">Edit</button>
</RouterLink>
</td>
          <td><button class="btn delete" @click="deleteProduct(product.itemname)">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <p v-else>No products available.</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style>
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
