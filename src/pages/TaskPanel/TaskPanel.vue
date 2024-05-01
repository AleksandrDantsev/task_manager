<script setup>
import { computed, ref } from 'vue';
import TaskCanvas from '../../modules/TaskCanvas/main/TaskCanvas.vue';
import { getReadableDate } from "../../helpers/getReadableDate";

const arrayDateShift = computed(() => {
    const arrayDate = [];
    for (let i = 0; i < 7; i++) {
        arrayDate.push(getReadableDate(-i))
    }
    return arrayDate;
})

</script>

<template>
    <div class="task-panel">
        <TaskCanvas v-for="item of arrayDateShift"
                    :key="item"
                    :date="item"/>
    </div>
</template>

<style scoped lang="scss">
    .task-panel {
        display: flex;
        width: 100%; 
        min-height: 100%;
        overflow-x: auto;
        background-color: #f5f5f5d8;
    }
</style>
