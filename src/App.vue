<script setup>
import { computed } from "vue";
import { SideBar } from "./modules/SideBar/index";
import shadow from "./hoc/shadow.vue";
import { TaskInfoSidePanel } from "./modules/TaskInfoSidePanel/index";
import { useStore } from 'vuex';

const store = useStore();

const isOpenPanel = computed(() => store.state.isOpenPanel);
const currentTask = computed(() => store.state.currentInfoEl);

const closeWindow = () => store.commit("togglePanel", false);

</script>

<template>
    <div class="wrapper">
        <SideBar />
        <div class="main-window">
            <header class="header">
                
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
        height: 100%;
    }
    .main-window {
        flex-grow: 1;
        height: 100%;
    }
    .header {
        width: 100%;
        height: 60px;
        border-bottom: solid 1px #e6e6e6;
    }
</style>
