import Home from "../pages/Home/Home.vue"
import { createRouter, createWebHistory } from 'vue-router';

const routes  = [
  { path: '/', name: 'Home', component: Home },
  // { path: '/about', component: 'rtrty' }
];


const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;