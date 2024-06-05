<script setup>
const props = defineProps({
    width: String,
    height: String,
    isOpenWindow: Boolean,
});
</script>

<template>
    <div class="card-drop" :class="{'show-drop-window': isOpenWindow}" :style="{width, height}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .card-drop {
        position: relative;
        z-index: 9999;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 0 5px 0 #d4d4d4d8;
        opacity: 0;
        overflow: hidden;
        display: none;
    }

    .show-drop-window {
        display: block;
        animation: show-drop-window 150ms ease forwards;
    }

    @keyframes show-drop-window {
        0% {
            opacity: 0.5;
            visibility: 0;
        }
        100% {
            opacity: 1;
            visibility: unset;
        }
    }


</style>