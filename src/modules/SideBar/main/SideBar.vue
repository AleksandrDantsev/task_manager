<script setup>
import { ref } from "vue";


const isClosedSideBar = ref(false);

const toggleShiftBar = () => {
    isClosedSideBar.value = !isClosedSideBar.value;
}

</script>

<template>
    <nav class="side-panel" :class="{'stateBarHide' : isClosedSideBar, 'stateBarShow' : !isClosedSideBar}">
        <div class="top_line">
            <div v-if="!isClosedSideBar" class="avatar">A</div>
            <div v-if="!isClosedSideBar" class="name">werwe</div>
            <div class="close" :class="{'rotate': !isClosedSideBar}" @click="toggleShiftBar">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#b3b3b3" viewBox="0 0 17 17"><path d="m15.2 8.5-4.35 3.35-.7-.7 2.64-2.65-2.64-2.65.7-.7 3.36 3.35zM7 17h1V0H7v17z"/></svg>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
    .side-panel {
        min-width: 20%;
        height: 100%;
        overflow: hidden;
        border-right: solid 1px #e6e6e6;
    }
    .avatar {
        font-size: 25px;
        font-weight: bold;
        color: #4d4d4d;
        text-align: center;
        line-height: 40px;
        height: 40px;
        width: 40px;
        background-color: green;
        border-radius: 5px;
        cursor: pointer;
        background-color: #f3f3f3;
    }
    .name {
        font-size: 18px;
        font-weight: bold;
        color: #4d4d4d;
        text-transform: capitalize;
    }
    .top_line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px #e6e6e6;
        padding: 0 10px;
        height: 60px;
    }
    .stateBarHide {
        animation: shiftAimationBarHide 500ms ease forwards;
    }
    .stateBarShow {
        animation: shiftAimationBarShow 400ms ease forwards;
    }
    .close {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 5px;
        width: 40px;
        svg {
            transition-duration: 400ms;
        }
        &:hover svg {
            fill: #0553c9;
        }
    }
    .rotate {
        transform: rotate(-180deg);
        animation: opacitySign 500ms ease forwards;
    }

    @keyframes opacitySign {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes shiftAimationBarShow {
        0% {
            opacity: 0;
            min-width: 60px;
        }
        40% {
            opacity: 0.02;
        }
        100% {
            opacity: 1;
            min-width: 20%;
        }
    }
    @keyframes shiftAimationBarHide {
        to {
            min-width: 60px;
            opacity: 1;
        }
    }
</style>


