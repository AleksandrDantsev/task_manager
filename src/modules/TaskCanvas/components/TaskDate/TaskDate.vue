<script setup>
const props = defineProps({
    date: String,
})


</script>

<template>
    <div class="task_date">
        {{ date }}
    </div>
</template>

<style scoped lang="scss">
    .task_date {
        color: #a8a8a8;
        padding: 10px 0;
    }
</style>
