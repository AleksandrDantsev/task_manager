<script setup>
    const props = defineProps({
        text: String,
        color: String,
    });
</script>

<template>
    <button @click="$emit('click', $event)" 
            class="send-button"
            :style="{'background-color': color}" 
            type="button">
            {{ text }}
    </button>    
</template>

<style lang="scss" scoped>
    .send-button {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        color: #ffffff;
        cursor: pointer;
        transition-duration: 400ms;
        background-color: #c40f0f;
        user-select: none;
        &:hover {
            background-color: #cf0f0f;

        }
    }
</style>