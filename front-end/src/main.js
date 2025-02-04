import './assets/main.css';

import router from './router';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
//import 'bulma/css/bulma.min.css'; // Import Bulma
const app = createApp(App);
const Pinia = createPinia();

app.use(router);
app.use(Pinia);

app.mount('#app');
