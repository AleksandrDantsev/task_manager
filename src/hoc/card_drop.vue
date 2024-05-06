<script setup>

</script>

<template>
    <div class="card-drop">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .card-drop {
        position: absolute;
        top: 35px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px 0 #d4d4d4d8;
    }
</style>