import { createRouter, createWebHistory } from 'vue-router';
import signin from '@/components/sign-in.vue';
import signupview from '@/components/signup.vue';
import Home from '@/components/home.vue';
import ProductForm from '@/components/product-form.vue';
import ShowProduct from '@/components/show-product.vue';
import Eidtproduct from '@/components/eidtproduct.vue';
import Billling from '@/components/billling.vue';
import { useUserStore } from '@/stores/userstore';
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
      meta: { requiresAuth: true }


    },
    {
      path: '/productform',
      name: 'productform',
      component: ProductForm,
      meta: { requiresAuth: true }

    },
    {
      path: '/showproduct',
      name: 'showproduct',
      component: ShowProduct,
      meta: { requiresAuth: true }
    },
    {
      path: "/editproduct/:itemname",
       name: 'eidtproduct',
      component: Eidtproduct,

    },
    {
      path: "/billing",
       name: 'billing',
      component: Billling,
      meta: { requiresAuth: true }

    },
  ],
});


export default router;
