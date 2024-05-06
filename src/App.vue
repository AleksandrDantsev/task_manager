<script setup>
import { SideBar } from "./modules/SideBar/index";
</script>
<template>
    <div class="wrapper">
        <SideBar />
        <div class="main-window">
            <header class="header">
                
            </header>
            <router-view></router-view>
        </div>
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
