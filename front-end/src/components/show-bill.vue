<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/userstore";

const userStore = useUserStore();
const bills = ref([]);
const errorMessage = ref(null);

async function fetchBills() {
  try {
    let response = await fetch("http://localhost:8000/api/billing");

    if (!response.ok) {
      throw new Error("Failed to fetch bills");
    }

    let data = await response.json();
    console.log("Fetched Bills:", data);
    bills.value = data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    errorMessage.value = "Failed to load bills. Please try again.";
  }
}
async function deletebill(username) {
  try {
    let response = await fetch(`http://localhost:8000/api/billing/${username}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete bill");
    }
    bills.value = bills.value.filter(bill => bill.username !== username);
  } catch (error) {
    console.error("Error deleting bill:", error);
    errorMessage.value = "Failed to delete bill. Please try again.";
  }
}


onMounted(fetchBills);
onMounted(() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
});
</script>

<template>
  <div v-if="userStore.user">
    <div class="container">
    <h1>All Bills</h1>

    <div v-if="bills.length > 0" class="bill-grid">
      <div v-for="bill in bills" :key="bill._id" class="bill-card">
        <p><b>Username:</b> {{ bill.username }}</p>
        <p><strong>Total Amount:</strong> ${{ bill.totalbill }}</p>

        <p><strong>Date:</strong> {{ new Date(bill.createdAt).toLocaleDateString() }}</p>

        <h4>Products:</h4>

          <table  class="table">
            <thead>
              <th>Product</th>
              <th>Quantity</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Price</th>

            </thead>
            <tbody>
             <tr v-for="product in bill.products" :key="product.productId">
              <td>{{ product.itemname }}</td>
              <td> {{ product.quantity }}</td>
              <td> ${{ bill.tax || 0 }}</td>
              <td> ${{ bill.discount || 0 }}</td>
              <td>${{ product.price }}</td>

               </tr>
            </tbody>
          </table>

        <button class="btn delete" @click="deletebill(bill.username)">Delete</button>
      </div>
    </div>

    <p v-else>No bills available.</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  </div>
</template>

<style>
.container {
  width: 80%;
  margin: auto;
  text-align: center;
}

.bill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.bill-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.bill-card:hover {
  transform: scale(1.05);
}

.bill-card h3 {
  margin-bottom: 10px;
}
.table {
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 1px;
}

table th {
  background: #333;
  color: white;
}

</style>
