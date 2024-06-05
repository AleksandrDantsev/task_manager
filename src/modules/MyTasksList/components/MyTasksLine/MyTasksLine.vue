<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    data: Object,
});

const store = useStore();

const isCompleted = computed(() => {
    const task = store.getters.getTask([props.data.date, props.data.id, props.data["project"]]);
    return task ? task.complete : false;
})

const completeTask = () => {
    const projectName = store.state.projectsStore.currentProject;
    store.commit("doneTask", [
            props.data.date, 
            props.data.id, 
            props.data.project,
        ]);
}

const openInfoTask = (e) => {
    if (e.target.id !== "done_task") {
        store.commit("setCurrentTask", props.data);
        store.commit("togglePanel", true);
    }
}

</script>
<template>
    <div class="list-task-line" @click="openInfoTask" :class="{'isCompleted-task': isCompleted}">
        <ul class="list-row">
            <li class="done">
                <button type="button" id="done_task" @click="completeTask" 
                        :class="{'isCompleted': isCompleted}">
                </button>
            </li>
            <li class="name" :class="{'isCompleted-task-text': isCompleted}">{{ data.taskName }}</li>
            <li class="project">{{ data.project }}</li>
            <li class="assignee">{{ data.assignee }}</li>
            <li class="date">{{ data.date }}</li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
    .blur {
        background-color: red;
    }
    .list-task-line {
        padding: 10px 0 10px 15px;
        border-bottom: solid 1px #e6e6e6;
        transition-duration: 300ms;
        cursor: pointer;
        &:hover {
            box-shadow: 0 3px 5px 0 #e7e7e7;
            border-radius: 5px;
        }
    }
    .list-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
    }
    .name {
        width: 40%;
        
    }
    .done {
        margin-right: 10px;
        button {
            border-radius: 50%;
            border: solid 2px #e6e6e6;
            width: 15px;
            height: 15px;
            cursor: pointer;
        }
    }
    .project {
        width: 20%;
    }
    .assignee {
        width: 20%;
    }
    .date {
        width: 20%;
    }
    .isCompleted {
        background-color: #98e7ae;
        border-color: #73df92;
    }
    .isCompleted-task {
        opacity: 0.6;
    }
    .isCompleted-task-text {
        text-decoration: line-through;
    }
</style>