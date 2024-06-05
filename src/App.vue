<script setup>
import { ref, computed } from "vue";
import { SideBar } from "./modules/SideBar/index";
import shadow from "./hoc/shadow.vue";
import AddProject from "./components/AddProject/AddProject.vue";
import { TaskInfoSidePanel } from "./modules/TaskInfoSidePanel/index";
import { useStore } from 'vuex';
import SearchTask from "./components/SearchTask/SearchTask.vue";

const store = useStore();

const isOpenPanel = computed(() => store.state.infoTask.isOpenPanel);
const currentTask = computed(() => store.state.infoTask.currentInfoEl);
const isClosedSideBar = ref(false);

const closeWindow = () => store.commit("togglePanel", false);

const toggleShiftBar = () => {
    isClosedSideBar.value = !isClosedSideBar.value;
}


</script>

<template>
    <div class="wrapper">
        <SideBar @toggle-side-bar="toggleShiftBar" :isClosedSideBar="isClosedSideBar" />
        <div class="main-window" :class="{'large-window': isClosedSideBar}">
            <header class="header">
                <AddProject />
                <!-- <SearchTask />   -->
            </header>
            <router-view></router-view>
        </div>
        <shadow :isOpenWindow="isOpenPanel" 
                @close-window="(isCurrentTarget) => isCurrentTarget ? closeWindow() : ''">
            <TaskInfoSidePanel :data="currentTask" :name="currentTask['taskName']"/>
        </shadow>
    </div>
</template>

<style scoped lang="scss">
    .wrapper{
        display: flex;
        height: 100vh;
    }
    .main-window {
        flex-grow: 1;
        width: 80%;
        height: 100%;
    }
    .large-window {
        animation: toLargeWidthWindow 1s ease forwards;
    }
    .header {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 0 28px;
        border-bottom: solid 1px #e6e6e6;
    }

    @keyframes toLargeWidthWindow {
        0% {
            width: 80%;
        }
        100% {
            width: calc(100% - 60px) !important;
        }
    }
</style>
