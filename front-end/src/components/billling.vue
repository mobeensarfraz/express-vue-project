<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/userstore";
import router from "@/router";
const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
const totalBill = ref(0);
const discount = ref(0);
const tax = ref(0);
const showBill = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const products = ref([]);
const selectedProduct = ref(null);
const quantity = ref(1);
const username = ref("");
const userStore = useUserStore();

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/product");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const calculateTotal = () => {
  let subtotal = cart.value.reduce((sum, product) => sum + product.sellingprice * product.quantity, 0);
  let taxAmount = (subtotal * tax.value) / 100;
  let discountAmount = (subtotal * discount.value) / 100;
  totalBill.value = subtotal + taxAmount - discountAmount;
};

const deleteFromCart = (productId) => {
  let storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  let productIndex = storedCart.findIndex(product => product._id === productId);

  if (productIndex !== -1) {
    if (storedCart[productIndex].quantity > 1) {
      storedCart[productIndex].quantity -= 1; // Decrease quantity by 1
    } else {
      storedCart.splice(productIndex, 1); // Remove product if quantity is 1
    }
  }

  localStorage.setItem("cart", JSON.stringify(storedCart));
  cart.value = storedCart;
  calculateTotal();
};


const addToCart = () => {
  if (!selectedProduct.value) {
    alert("Please select a product first!");
    return;
  }

  let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingProduct = storedCart.find(item => item._id === selectedProduct.value._id);

  if (existingProduct) {
    existingProduct.quantity += parseInt(quantity.value);
  } else {
    storedCart.push({ ...selectedProduct.value, quantity: parseInt(quantity.value) });
  }

  localStorage.setItem("cart", JSON.stringify(storedCart));
  cart.value = storedCart;
  calculateTotal();
  searchQuery.value = "";
  selectedProduct.value = null;
  quantity.value = 1;
};

const submitBill = async () => {
  if (cart.value.length === 0) {
    alert("Cart is empty. Add products first!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8000/api/billing", {
      username: username.value,
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
      username.value = "";
      showBill.value = false;
    }
  } catch (error) {
    console.error("Error submitting bill:", error);
    errorMessage.value = "Failed to submit the bill. Please try again.";
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.itemname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const selectProduct = (product) => {
  selectedProduct.value = product;
  searchQuery.value = product.itemname;
};


onMounted(() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
  cart.value = JSON.parse(localStorage.getItem("cart")) || [];
  calculateTotal();
  fetchProducts();
});
</script>

<template>


  <div class="parent " >

    <div class="box">
      <h1>Billing Information</h1>
    </div>

    <div class="main-box">
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
    </div>

    <div class="container-bill">
      <h2>Bill Summary</h2>

      <div class="input-parent">
        <label for="username">Customer Name:</label>
        <input name="username" type="text" v-model="username">
      </div>


      <div class="input-parent">
        <label>Search Product:</label>
        <input type="text" v-model="searchQuery" placeholder="Search product">
        <ul v-if="searchQuery && filteredProducts.length > 0" class="search-results">
          <li v-for="product in filteredProducts" :key="product._id" @click="selectProduct(product)">
            {{ product.itemname }} - ${{ product.sellingprice }}
          </li>
        </ul>
      </div>


<div class="input-parent">
      <label>Quantity:</label>
        <input type="number" v-model="quantity" min="1">
</div>
<div class="input-parent">
      <label>Discount (%):</label>
        <input type="number" v-model="discount" @input="calculateTotal">
      </div>
      <div class="input-parent">
      <label>Tax (%):</label>
        <input type="number" v-model="tax" @input="calculateTotal">
      </div>
      <button class="btn add-to-cart" @click="addToCart">Add to Cart</button>


      <p><strong>Subtotal:</strong> ${{ totalBill }}</p>
      <p><strong>Total Bill:</strong> ${{ totalBill }}</p>
      <button class="btn" @click="submitBill">Submit Bill</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

</template>

<style>
.parent {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.search-results {
list-style-type: none;
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  right: 0;
  margin-top: 40px;
  margin-right: 400px;
  width: 200px;
}

.search-results li {
  padding: 5px;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #dcd1f1;
}

.box {
  background: rgba(207, 207, 207, 0.7);
  color: black;
  text-align: center;
  padding: 15px;
  border: 1px solid black;
}

.main-box {
  display: flex;
  justify-content: center;
  text-align: center;
  background: rgba(207, 207, 207, 0.7);
}

.container-bill {
  background: rgba(207, 207, 207, 0.7);
  color: black;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.input-parent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input-parent input {
  max-width: 50%;
}
.btn{
  padding: 10px;
  background: rgba(27, 27, 27, 0.7);
  color: rgb(253, 253, 253);
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>
