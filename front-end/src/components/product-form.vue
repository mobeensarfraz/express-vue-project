<script setup>
import backgroundImage from '@/assets/img/background.jpg';
import { ref, onMounted } from "vue";
import { useUserStore } from '@/stores/userstore';
import router from '@/router';

const userStore = useUserStore();

const itemname = ref("");
const purchaseprice = ref("");
const sellingprice = ref("");
const iteminstock = ref("");
const selectedFile = ref(null);
const post = ref(null);
const errorMessage = ref(null);

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0];
};

const fetchPost = async () => {
  if (!selectedFile.value) {
    alert("Please select an image file.");
    return;
  }

  const formData = new FormData();
  formData.append('itemname', itemname.value);
  formData.append('purchaseprice', purchaseprice.value);
  formData.append('sellingprice', sellingprice.value);
  formData.append('iteminstock', iteminstock.value);
  formData.append('image', selectedFile.value);

  try {
    const response = await fetch("http://localhost:8000/api/product", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      errorMessage.value = data.error || "Failed to add product. Please try again.";
      alert(errorMessage.value);
      return;
    }

    post.value = await response.json();
    alert("Product added successfully!");
  } catch (error) {
    errorMessage.value = "Network error. Please try again.";
    alert(errorMessage.value);
    console.error(error);
  }
};

onMounted(() => {
  if (!userStore.user) {
    router.push('/sign-up');
  }
});
</script>


<template>
  <div v-if="userStore.user">
    <div class="image" :style="{ backgroundImage: `url(${backgroundImage})`}">
      <div class="form-card-pro">
        <h1 style="text-align: center; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          Add PRODUCTS IN FRESHhut
        </h1>
        <h2 style="text-align: left; padding: 10PX;">Create A New Product</h2>

        <form @submit.prevent="fetchPost" >
          <div class="form-group-pro">
            <input v-model="itemname" type="text" placeholder="Enter item name"  required />
          </div>
          <div class="form-group-pro">
            <input v-model="purchaseprice" type="number" placeholder="Enter purchase price"  required />
          </div>
          <div class="form-group-pro">
            <input v-model="sellingprice" type="number" placeholder="Enter selling price"  required />
          </div>
          <div class="form-group-pro">
            <input v-model="iteminstock" type="number" placeholder="Enter items in stock"  required /></div>
            <div class="form-group-pro">
            <input type="file" accept=".jpg,.jpeg" @change="handleFileSelect" />
          </div>
          <button type="submit" class="btn-pro">Add Product</button>
        </form>
      </div>
    </div>
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

.form-card-pro {
  margin-left: 10px;
  text-align: center;
  width: 40%;
  border: 2px solid white;
  box-shadow: inset;
  border-radius: 12px;
  margin: 70px auto;
  background: rgba(207, 207, 207, 0.7);
  padding: 20px;
}

.form-group-pro {
  margin-bottom: 10px;
  text-align: center;
}

input {
  width: 90%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #525252;
  border-radius: 4px;
  background: rgba(207, 207, 207, 0.7);
}

.btn-pro {
  padding: 10px;
  background: rgba(27, 27, 27, 0.7);
  color: rgb(253, 253, 253);
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-pro:hover {
  background: blue;
}
</style>
