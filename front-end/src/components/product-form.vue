<script setup>
import backgroundImage from '@/assets/img/background.jpg';
import { ref } from "vue";


const itemname = ref("");
const purchaseprice = ref("");
const sellingprice = ref("");
const iteminstock = ref("");
const itempicturenumber = ref("");
const post = ref(null);
const errorMessage = ref(null);

async function fetchPost() {
  try {
    let response = await fetch('http://localhost:8000/api/product',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    itemname:itemname.value,
    purchaseprice:purchaseprice.value,
    sellingprice:sellingprice.value,
    iteminstock:iteminstock.value,
    itempicturenumber:itempicturenumber.value,


    })
});
post.value = await response.json();

  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = "Network error. Please try again.";
  }
}



</script>
<template>
  <div class="image" :style="{ backgroundImage: `url(${backgroundImage})`}">
      <div class="form-card-pro">

          <h1 style="text-align: center; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ;"> Add PRODUCTS IN FRESHhut </h1>
          <h2 style="text-align: left; padding: 10PX;"> Create A New Product</h2>

          <form @submit.prevent="handleSubmit">
            <div class="form-group-pro">
              <input v-model="itemname" type="text" placeholder="Enter item name" />
            </div>
            <div class="form-group-pro">
              <input v-model="purchaseprice" type="number" placeholder="Enter purchaseprice" />
            </div>
             <div class="form-group-pro">
              <input v-model="sellingprice" type="number" placeholder="Enter sellingprice" />
            </div>
                <div class="form-group-pro">
              <input v-model="iteminstock" type="number" placeholder="Enter iteminstock" />
            </div>
                <div class="form-group-pro">
              <input v-model="itempicturenumber" type="text" placeholder="Enter itempicturenumber" />
            </div>
            <RouterLink to="/showproduct"><button type="submit" @click="fetchPost" class="btn-pro">add product</button></RouterLink>

          </form>


        </div>
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




.form-card-pro {
  margin-left: 10px;
  text-align: center;
  width: 40%;
  border: 2px solid white;
  box-shadow: inset;
  border-radius: 12px;
  margin: 70px;
  margin-left:400px ;
  background: rgba(207, 207, 207, 0.7);



}

.form-group-pro {
  margin-bottom: 10px;
  text-align: center;
}


input {
  width: 90%;
  padding: 8px;
  margin-top: 5px;
  margin-left: 2px;
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
