<script setup>
import { computed, ref } from 'vue';
import { TaskCanvas } from '../../modules/TaskCanvas/index';
import { TaskFiltersRow } from '../../modules/TaskFiltersRow';
import { getReadableDate } from "../../helpers/getReadableDate";


const shiftDate = ref(0);
const changeShiftDate = (bool) => bool === true ? shiftDate.value = shiftDate.value + 1 :
                                                  shiftDate.value = shiftDate.value - 1; 

const arrayDateShift = computed(() => {
    const arrayDate = [];
    for (let i = 0; i < 7; i++) {
        arrayDate.push(getReadableDate(-i + shiftDate.value));
    }
    return arrayDate;
})

</script>

<template>
    <div class="wrapper">
        <TaskFiltersRow :changeShiftDate="changeShiftDate" :currentDate="arrayDateShift[0]"/>
        <div class="task-panel">
            <TaskCanvas v-for="item of arrayDateShift"
                        :key="item"
                        :date="item"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column; 
        padding: 10px;
        background-color: #fafafad8;
        width: 100%; 
    }
    .task-panel {
        display: flex;
        min-height: calc(100% - 90px);
        overflow-x: auto;
    }
</style>
