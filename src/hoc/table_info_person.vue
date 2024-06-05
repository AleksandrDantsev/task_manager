<script setup>
    const props = defineProps({
        title: String,
    });
</script>

<template>
    <div class="wrapper-info-input">
        <div class="title-info-input">{{ title }}</div>
        <slot></slot>  
    </div>
</template>

<style lang="scss" scoped>
    .wrapper-info-input {
        width: 100%;
        height: 100%;
    }
    .title-info-input {
        padding-bottom: 15px;
        font-weight: 600;
        margin-left: 2px;
    }
</style>