<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
const totalBill = ref(0);
const discount = ref(0);
const tax = ref(0);
const showBill = ref(false);
const errorMessage = ref("");

const calculateTotal = () => {
  let subtotal = cart.value.reduce((sum, product) => sum + product.sellingprice * product.quantity, 0);
  let taxAmount = (subtotal * tax.value) / 100;
  let discountAmount = (subtotal * discount.value) / 100;
  totalBill.value = subtotal + taxAmount - discountAmount;
};

const deleteFromCart = (productId) => {
  cart.value = cart.value.filter(product => product._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart.value));
  calculateTotal();
};

const submitBill = async () => {
  if (cart.value.length === 0) {
    alert("Cart is empty. Add products first!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8000/api/billing", {
      username: "testuser",
      products: cart.value.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      })),
      discount: discount.value,
      tax: tax.value,
    });

    if (response.status === 201) {
      alert("Bill generated successfully!");
      localStorage.removeItem("cart");
      cart.value = [];
      showBill.value = false;
    }
  } catch (error) {
    console.error("Error submitting bill:", error);
    errorMessage.value = "Failed to submit the bill. Please try again.";
  }
};

onMounted(calculateTotal);
</script>



<template>
  <div class="box">
 <div class="main-box">
  <h1>Billing information</h1>

    <table v-if="cart.length > 0">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart" :key="product._id">
          <td>{{ product.itemname }}</td>
          <td>{{ product.quantity }}</td>
          <td>${{ product.sellingprice * product.quantity }}</td>
          <td>
            <button @click="deleteFromCart(product._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No products in cart.</p>

    <button class="btn" @click="showBill = true; calculateTotal()">Show Bill</button>
</div>

    <div class="container-bill" v-if="showBill">
      <h2>Bill Summary</h2>
      <p><strong>Subtotal:</strong> ${{ totalBill }}</p>
      <label>Discount (%): <input type="number" v-model="discount" @input="calculateTotal" /></label>
      <label>Tax (%): <input type="number" v-model="tax" @input="calculateTotal" /></label>
      <p><strong>Total Bill:</strong> ${{ totalBill }}</p>
      <button class="btn" @click="submitBill">Submit Bill</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style>
.box {
  display: flex;
  width: 80%;
  border: 2px solid white;
  box-shadow: inset;
  border-radius: 12px;
  margin: 100px;
  background: rgba(46, 31, 31, 0.7);


}
.main-box{
  width: 80%;
  height: 60%;
  margin: 9px;
}
.container-bill{
  width: 80%;
  margin: 10px;
  border:1px solid black ;

}
</style>
