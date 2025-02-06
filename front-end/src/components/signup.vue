<script setup>
import backgroundImage from '@/assets/img/background.jpg';
import { ref } from "vue";
import { RouterLink } from 'vue-router';
import router from '@/router';
const username = ref("");
const email = ref("");
const password = ref("");
const post = ref(null);
async function fetchPost() {
  try {
    let response = await fetch('http://localhost:8000/api/user',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username:username.value,
    email:email.value,
    password:password.value,

    })
});
    post.value = await response.json();
     router.push('/')
  } catch (error) {
    console.error('Error:', error);
  }
}


</script>
<template>
  <div class="image" :style="{ backgroundImage: `url(${backgroundImage})`}">
  <div class="content-box" >
    <div class="left-box">
      <div class="form-card">

          <h1 style="text-align: center; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ;">FRESHhut</h1>
          <h2 style="text-align: left;">Sign up</h2>
          <p style="text-align: left;" class="signin-link">
            Already have an account? <router-link to=''>signin</router-link>
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input v-model="username" type="text" placeholder="Enter your username" />
            </div>

            <div class="form-group">
              <input v-model="email" type="email" placeholder="Enter your email" />
            </div>

            <div class="form-group">
              <input v-model="password" type="password" placeholder="Enter your password" />
            </div>

            <div class="form-group">
              <input v-model="password" type="password" placeholder="Conform your password" />
            </div>





            <button type="submit" @click="fetchPost"  class="btn"> Create Account</button>
          </form>


        </div>
      </div>

      <div class="right-box">
        <h2>FRESHhut</h2>
        <p><b> This is the platform where you can get the products which you can use in daily routine........</b> </p>
      </div>
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


.content-box {
  display: flex;
  width: 80%;
  border: 2px solid white;
  box-shadow: inset;
  border-radius: 12px;
  margin: 100px;
  background: rgba(207, 207, 207, 0.7);


}

.left-box {

  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
 color: rgb(7, 7, 7);
 border-radius: 12px;


}

.form-card {
  padding:10px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-right: 100px;
}

.right-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid rgb(236, 232, 232);
  padding: 20px;
  color:rgb(46, 30, 30);

}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}


input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-left: 2px;
  border: 1px solid #525252;
  border-radius: 4px;
  background: rgba(207, 207, 207, 0.7);

}

.btn {

  padding: 10px;
  background: rgba(27, 27, 27, 0.7);
  color: rgb(253, 253, 253);
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background: blue;
}
.signin-link {
  margin-top: 10px;
  font-size: 14px;
}

.signin-link a {
  color: #007bff;
}

.signin-link a:hover {
  text-decoration: underline;
}




</style>
