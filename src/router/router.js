import TaskPanel from "../pages/TaskPanel/TaskPanel.vue"
import { createRouter, createWebHistory } from 'vue-router';

const routes  = [
  { path: '/', name: 'TaskPanel', component: TaskPanel },
  // { path: '/about', component: 'rtrty' }
];


const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;