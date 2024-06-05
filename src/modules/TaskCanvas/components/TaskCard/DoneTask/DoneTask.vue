<script setup>
import { useStore } from 'vuex';

    const props = defineProps({
        id: Number,
        date: String,
        isCompletedTask: Boolean,
    });

    const store = useStore();

    const doneTask = () => {
        const nameProject = store.state.projectsStore.currentProject;
        store.commit("doneTask", [props.date, props.id, nameProject]);
    }
</script>

<template>
    <div class="task_card__done">
        <button type="button" @click="doneTask" class="task_card__done-bt" :class="{'button-completed': isCompletedTask}">
            <svg width="12" height="12" viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.7 14.3 9.6 19 20.3 5"/></svg>
        </button>
    </div>    
</template>

<style lang="scss" scoped>
    .task_card__done button {
        border-radius: 50%;
        height: 15px;
        width: 15px;
        outline: solid 1px #d4d4d4d8;
        cursor: pointer;
        svg {
            transition-duration: 200ms;
            opacity: 0;
        }
        &:hover {
            svg {
                opacity: 1;
            }
        }
    }
    .button-completed {
        background-color: #98e7ae;
        border-color: #73df92;
    }
</style>