<script setup>
const props = defineProps({
    isOpenWindow: Boolean,
});
</script>

<template>
    <div @click="$emit('close-window', $event.target.matches('.shadow-window'))" 
         class="shadow-window" :class="{'open': isOpenWindow, 'close': props.isOpenWindow === false}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .shadow-window{
        background-color: #1b1b1b33;
        position: fixed;
        z-index: 900;
        top: -20px;
        left: 0;
        right: 0;
        bottom: -20px;
        visibility: hidden;
        opacity: 0;
        transform: translate3d(0, 15px, 0);
    }
    .open {
        animation: showAnim 400ms ease forwards;
    }
    .close {
        animation: hideAnim 400ms ease forwards;
    }

    @keyframes showAnim {  
        to {
            visibility: visible;
            opacity: 1;
            transform: initial;
        } 
    }

    @keyframes hideAnim {
        to {
            visibility: hidden;
            opacity: 0;
            transform: translate3d(0, 15px, 0);
        }   
    }
</style>