import TaskPanel from "../pages/TaskPanel/TaskPanel.vue";
import MyTasks from "../pages/MyTasks/MyTasks.vue";
import PersonalSettings from "../pages/PersonalSettings/PersonalSettings.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', redirect: '/personal-info' },
    { path: "/all-tasks", name: "TaskPanel", component: TaskPanel },
    { path: "/my-tasks", component: MyTasks },
    { path: "/personal-info", component: PersonalSettings },
    // { path: "/projects", component: "rtrty3333" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
