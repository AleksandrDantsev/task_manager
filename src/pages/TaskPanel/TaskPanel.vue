<script setup>
import { computed, ref } from 'vue';
import { TaskCanvas } from '../../modules/TaskCanvas/index';
import { TaskFiltersRow } from '../../modules/TaskFiltersRow';
import { getReadableDate } from "../../helpers/getReadableDate";
import { Bin } from "../../modules/Bin/index";

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
            <Bin />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper {
        
        display: flex;
        flex-direction: column; 
        padding: 10px;
        background-color: #f7f7fd4f;
        overflow-x: auto;
        max-height: 90%;
        width: 100%; 
    }
    .task-panel {
        position: relative;
        display: flex;
        min-height: calc(100% - 90px);
    }
</style>
