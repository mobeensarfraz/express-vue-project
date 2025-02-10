import { createRouter, createWebHistory } from 'vue-router';
import signin from '@/components/sign-in.vue';
import signupview from '@/components/signup.vue';
import Home from '@/components/home.vue';
import ProductForm from '@/components/product-form.vue';
import ShowProduct from '@/components/show-product.vue';
import Eidtproduct from '@/components/eidtproduct.vue';
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
    {
      path: '/productform',
      name: 'productform',
      component: ProductForm,
    },
    {
      path: '/showproduct',
      name: 'showproduct',
      component: ShowProduct,
    },
    {
      path: "/editproduct/:itemname",
       name: 'eidtproduct',
      component: Eidtproduct,
    },
  ],
});
export default router;
