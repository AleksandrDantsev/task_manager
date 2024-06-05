<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { secondsFormat } from "../../../../helpers/secondsFormat";

const props = defineProps({
    data: Object,
});

const timeTask = ref(0);
const isCountStart = ref(false);
let interval;

const store = useStore();

const closeSideInfoPanel = () => {
    store.commit('togglePanel', false);
}

const deleteTask = () => {
    const nameProject = store.state.projectsStore.currentProject;
    store.commit("deleteTask", [props.data.date, props.data.id, nameProject]);
    store.commit('togglePanel', false);
}

const doneTask = () => {
    const nameProject = store.state.projectsStore.currentProject;
    store.commit("doneTask", [props.data.date, props.data.id, nameProject])
}

const timeForTask = computed(() => {
    if (props.data["timeLimit"]) return `${props.data["timeLimit"].h} h. ${props.data["timeLimit"].m} min.`;
    else return null;
})



const countdown = () => {
    isCountStart.value = !isCountStart.value;
    
    if (isCountStart.value) {
        interval = setInterval(() => timeTask.value += 1, 1000);
    }
    else clearInterval(interval)
}

const timeFormat = computed(() => secondsFormat(timeTask.value));

const isCompletedTask = computed(() => {
    const nameProject = store.state.projectsStore.currentProject;
    return store.getters.getFieldFirstLevelTask([
        props.data.date, 
        props.data.id, 
        "complete",
        nameProject,
    ])
})

</script>

<template>
    <div class="task-panel__actions">
        <div class="general-actions">
            <button class="task-completed" :class="{'completed-task': isCompletedTask}" @click="doneTask">
                <div class="circle-done" :class="{'completed-task-tick': isCompletedTask}">
                    <svg v-if="isCompletedTask" width="15" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#00a92f"><path fill="none" stroke="#00a92f" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M3.7 14.3 9.6 19 20.3 5"/></svg>
                </div>
                <div class="text-completed">{{ isCompletedTask ? 'Completed' : 'Complete' }}</div>
            </button>
            <button class="task-start" @click="countdown">
                <div class="icon-start-pause"></div>
                <div class="time-text">Start ({{ timeFormat }})</div>
                <div v-if="timeForTask" class="time-limit">{{ timeForTask }}</div>
            </button>
        </div>
        <div class="second-actions">
            <ul class="second-actions-list">
                <li class="second-actions-delete">
                    <button class="button-delete" @click="deleteTask">
                        <svg data-v-a57a7b67="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                            viewBox="0 0 24 24">
                            <g data-v-a57a7b67="" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path data-v-a57a7b67="" d="M9 5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9V5Z"></path>
                                <path data-v-a57a7b67=""
                                    d="M9 5H7a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3m5-16h2a2 2 0 0 1 2 2v5m-5 4 2.5 2.5M19 21l-2.5-2.5m0 0L19 16m-2.5 2.5L14 21">
                                </path>
                            </g>
                        </svg>
                    </button>
                </li>
                <li class="second-actions-close">
                    <button class="button-close" @click="closeSideInfoPanel">
                        <svg data-v-792b3c77="" data-v-d7e04b56="" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" style="height: 20px; width: 20px; fill: #b3b3b3;">
                            <path opacity="0.39"
                                d="M14.8 13.4L18.7 17.3C19.1 17.7 19.1 18.3 18.7 18.7C18.3 19.1 17.7 19.1 17.3 18.7L13.4 14.8C13 14.4 13 13.8 13.4 13.4C13.8 13 14.4 13 14.8 13.4Z"
                                fill="##b3b3b3"></path>
                            <path
                                d="M6.70002 18.7C6.30002 19.1 5.7 19.1 5.3 18.7C4.9 18.3 4.9 17.7 5.3 17.3L10.6 12L5.3 6.70002C4.9 6.30002 4.9 5.7 5.3 5.3C5.7 4.9 6.30002 4.9 6.70002 5.3L12 10.6L17.3 5.3C17.7 4.9 18.3 4.9 18.7 5.3C19.1 5.7 19.1 6.30002 18.7 6.70002L6.70002 18.7Z"
                                fill="##b3b3b3"></path>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@mixin formGeneralButtons($backCol) {
    height: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: $backCol;
    cursor: pointer;
}

.task-panel__actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 45px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: solid 1px #e6e6e6;
}

.general-actions {
    display: flex;
    align-items: center;
}

.second-actions-list {
    display: flex;
    align-items: center;
}

.task-completed {
    display: flex;
    align-items: center;
    width: 150px;
    margin-right: 20px;
    @include formGeneralButtons(#6c78f41a);
}

.circle-done {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    border: solid 2px #6c78f4;
}

.text-completed {
    font-weight: 600;
    font-size: 14px;
    color: #6c78f4;
}

.task-start {
    display: flex;
    align-items: center;
    border: solid 1px #c1c2c4;
    transition-duration: 400ms;
    @include formGeneralButtons(#ffffff);
}

.icon-start-pause {
    margin-right: 10px;
}

.time-text {
    color: #7a809b;
    font-weight: 600;
    font-size: 14px;
}
.time-limit {
    margin-left: 15px;
    color: #7a809b;
    font-weight: 600;
    font-size: 12px;
}

.second-actions {
    display: flex;
    align-items: center;
}

.second-actions-list {
    li {
        padding: 0 15px;
    }

    button {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
}

.second-actions-close {
    margin: 0;
    border-left: solid 1px #ebebeb;
}
.completed-task {
    background-color: #00a92f1a;
    .text-completed {
        color: #00a92f;
    }
    .circle-done {
        border-color: #00a92f;
    }
}
</style>