import { createRouter, createWebHistory } from 'vue-router';
import signin from '@/components/sign-in.vue';
import signupview from '@/components/signup.vue';
import Home from '@/components/home.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL??"http://localhost:5173"),
    routes: [
    {
      path: '/',
      name: 'signin',
      component: signin,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: signupview,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});
export default router;
