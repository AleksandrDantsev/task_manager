<script setup>
const props = defineProps({
    content: String | Number,
})
</script>

<template>
    <button class="button">
        {{ props.content }}
    </button>
</template>

<style scoped lang="scss">
    .button {
        height: 24px;
        width: 24px;
        border-radius: 3px;
        font-size: 11px;
        color: #8d8d8d;
        font-weight: 600;
        background-color: #f5f5f5d8;
    }
</style>