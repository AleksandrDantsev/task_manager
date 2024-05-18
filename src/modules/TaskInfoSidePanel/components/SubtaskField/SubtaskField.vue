<script setup>
import { computed } from "vue";
import { useStore } from 'vuex';
import SubtaskInput from '../SubtaskInput/SubtaskInput.vue';
import SubtaskUnit from "../SubtaskUnit/SubtaskUnit.vue";

    const props = defineProps({
        id: Number,
        date: String,
    });
    const store = useStore();

    const subtasksArray = computed(() => {
        if (props.date && props.id) {
            return store.getters.getTask([props.date, props.id])['subtasks'] || [];
        }
        return [];
    })

</script>
<template>
    <div class="row-subtask">
        <div class="view-info">
            <div class="icon">
                <svg fill="#b3b3b3" width="20" height="21" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M15 32h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Zm-3-2h2v-2h-2Z" class="clr-i-outline clr-i-outline-path-1"/><path d="M15 16h-4a1 1 0 0 0-1 1v1.2H5.8V12H7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1.2v17.8h6.36a.8.8 0 0 0 0-1.6H5.8v-8.4H10V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM4 8h2v2H4Zm10 12h-2v-2h2Z" class="clr-i-outline clr-i-outline-path-2"/><path d="M34 9a1 1 0 0 0-1-1H10v2h23a1 1 0 0 0 1-1Z" class="clr-i-outline clr-i-outline-path-3"/><path d="M33 18H18v2h15a1 1 0 0 0 0-2Z" class="clr-i-outline clr-i-outline-path-4"/><path d="M33 28H18v2h15a1 1 0 0 0 0-2Z"/><path fill="none" d="M0 0h36v36H0z"/></svg>
            </div>
            <div class="name subtask-name"><h5>Subtasks</h5></div>
        </div>
        <div class="input-subtask-main-wrapper">
            <div class="subtask-deploy-conteiner" v-if="subtasksArray.length">
                <SubtaskUnit v-for="item of subtasksArray" 
                            :key="item.id"
                            :data="item" 
                            :date="props.date"
                            :id="props.id"
                            />
            </div>
            <SubtaskInput :date="date" :id="id"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .row-subtask {
        margin-top: 10px;
    }
    .view-info {
        display: flex;
        align-items: center;
    }
    .icon {
        margin-right: 12px;
        display: flex;
        align-items: center;
    }
    .name {
        width: 200px;
        margin: 0 auto;
        h5 {
            font-size: 15px;
            color: #888686;
        }
    }
    .input-subtask-main-wrapper {
        padding: 10px 0;
    }
    .subtask-name {
        margin: 0;
    }
    .subtask-deploy-conteiner {
        margin: 8px 5px;
    }
</style>