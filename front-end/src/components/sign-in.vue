<script setup>
import backgroundImage from '@/assets/img/background.jpg';
import { ref } from "vue";
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userstore';
import router from '@/router';

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const errorMessage = ref(null);

async function fetchPost() {
  try {
    let response = await fetch('http://localhost:8000/api/user/login',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username:username.value,
    password:password.value,

    })
});
const data = await response.json();

    if (response.ok) {
      userStore.setUser(data);
      console.log("User stored in Pinia:", data);
      router.push("/home");

    } else {
      errorMessage.value = data.message || "login fail";
      alert(errorMessage.value);

    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = "Invalid username or password! .";
    alert(errorMessage.value);

  }
}



</script>
<template>
  <div class="image" :style="{ backgroundImage: `url(${backgroundImage})`}">
  <div class="content-box" >
    <div class="left-box">
      <div class="form-card">

          <h1 style="text-align: center; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ;">FRESHhut</h1>
          <h2 style="text-align: left;">Sign In</h2>
          <p style="text-align: left;" class="signup-link">
            Don't have an account?
           <router-link to="/sign-up">signup</router-link>
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input v-model="username" type="text" placeholder="Enter your username" />
            </div>
            <div class="form-group">
              <input v-model="password" type="password" placeholder="Enter your password" />
            </div>

            <div class="form-group remember-me">
              <input type="checkbox" v-model="rememberMe" id="rememberMe" />
              <label for="rememberMe">Remember Me</label>
              <p class="forgetlink">              <a href="#">forget  password</a>
              </p>

            </div>


            <button type="submit" @click="fetchPost" class="btn">Sign In</button>

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

.signup-link {
  margin-top: 10px;
  font-size: 14px;
}

.signup-link a {
  color: #007bff;
}

.signup-link a:hover {
  text-decoration: underline;
}
.forgetlink {
  margin-top: 10px;
  font-size: 14px;
  padding-left: 50px;
}

.forgetlink a {
  color: #007bff;
}

.forgetlink a:hover {
  text-decoration: underline;
}



.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;

}

.remember-me input {
  width: auto;


}


</style>
