<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import buttonSquare from '../../../../../UI/button-square.vue';
import shadow from '../../../../../hoc/shadow.vue';
import ConfirmWindow from '../../../../../UI/confirm-window.vue';

    const props = defineProps({
        date: String,
        number: Number,
        id: Number,
        isBinPosition: Boolean,
    });

    const store = useStore();
    const isDeleteConfirmOpen = ref(false);

    const openDeleteWindow = () => isDeleteConfirmOpen.value = true;

    const openInfoPanel = (e) => {
        e.stopPropagation();
        const nameProject = store.state.projectsStore.currentProject;
        store.commit("setActiveTask", [props.date, props.id, nameProject, props.isBinPosition]);
        store.commit("togglePanel", true);
    }

    const deleteTask = (neededDelete) => {
        if(!props.isBinPosition) {
            if (neededDelete) {
                const nameProject = store.state.projectsStore.currentProject;
                store.commit('deleteTask', [props.date, props.id, nameProject])
            }
        }
        else {
            store.commit('deleteTaskFromBin', props.id);
        }
        isDeleteConfirmOpen.value = false;
    }



</script>

<template>
    <ul class="task_card__actions">
        <li class="task_card__number">
            <buttonSquare :content="'#' + number" />
        </li>
        <li class="task_card__parent-task" @click="openInfoPanel">
            <svg fill="#b3b3b3" width="17" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M15 32h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Zm-3-2h2v-2h-2Z" class="clr-i-outline clr-i-outline-path-1"/><path d="M15 16h-4a1 1 0 0 0-1 1v1.2H5.8V12H7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1.2v17.8h6.36a.8.8 0 0 0 0-1.6H5.8v-8.4H10V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM4 8h2v2H4Zm10 12h-2v-2h2Z" class="clr-i-outline clr-i-outline-path-2"/><path d="M34 9a1 1 0 0 0-1-1H10v2h23a1 1 0 0 0 1-1Z" class="clr-i-outline clr-i-outline-path-3"/><path d="M33 18H18v2h15a1 1 0 0 0 0-2Z" class="clr-i-outline clr-i-outline-path-4"/><path d="M33 28H18v2h15a1 1 0 0 0 0-2Z"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        </li>
        <li class="task_card__comments" @click="openInfoPanel">
            <svg width="17" height="22" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill-rule="evenodd" clip-rule="evenodd" d="m4 11.29 1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5v1.79zM10.29 13l1.86 1.85.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5h3.79zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14-.35-.15z"/></svg>
        </li>
        <li class="task_card__delete_task" @click="openDeleteWindow">
            <svg width="16" height="24" viewBox="0 0 1000 910" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/></svg>
        </li>
        <shadow :isOpenWindow="isDeleteConfirmOpen" 
                @close-window="(isCurrentTarget) => {isCurrentTarget ? isDeleteConfirmOpen = false : ''}">
                <ConfirmWindow :text="'Are you sure that you want to delete the task?'" :deleteTask="deleteTask"/>
        </shadow>
    </ul>
</template>

<style lang="scss" scoped>
    .task_card__actions {
        display: flex;
        li {
            cursor: pointer;
            margin-right: 10px;
            svg {
                transition-duration: 500ms;
                &:hover {
                    fill: #da0404da;
                }
            }
        }
    }
    .task_card__delete_task {
        svg:hover {
            fill: #e40000 !important;
        }
    }
</style>