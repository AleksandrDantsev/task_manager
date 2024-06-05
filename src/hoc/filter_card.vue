<script setup>

</script>

<template>
    <div class="filter-card">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .filter-card {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 #d4d4d4d8;
    }
</style>