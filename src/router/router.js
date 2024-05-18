import TaskPanel from "../pages/TaskPanel/TaskPanel.vue";
import MyTasks from "../pages/MyTasks/MyTasks.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "TaskPanel", component: TaskPanel },
    { path: "/my-tasks", component: MyTasks },
    // { path: "/projects", component: "rtrty3333" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
