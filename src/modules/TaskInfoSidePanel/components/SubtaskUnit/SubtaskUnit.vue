<script setup>
import { capitalize, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
    data: Object,
    date: String,
    id: Number,
});

const isUserEdit = ref(false);
const newTaskText = ref(props.data.name);

const allowEditAndSubmit = () => {
    if (isUserEdit.value === false) {
        isUserEdit.value = true;
    }
    else {
        const capitalizeText = capitalize(newTaskText.value);
        store.commit("changeFieldCommentOrSubtask", [
            props.date, 
            props.id, 
            props.data.id, 
            capitalizeText,
            "subtasks",
            "name",
        ]);
        isUserEdit.value = false;
    }
}

const completedTask = () => {
    store.commit("changeFieldCommentOrSubtask", [
            props.date, 
            props.id, 
            props.data.id, 
            !props.data.isCompleted,
            "subtasks",
            "isCompleted",
        ]);
}

const deleteSubtask = () => {
    store.commit("deleteCommentOrSubtask", [props.date, props.id, props.data.id, "subtasks"]);
}

const changeSubtaskText = (e) => {
    newTaskText.value = e.target.value;
}

</script>
<template>
    <div class="subtask" :class="{'isCompleted-task': data.isCompleted}">
        <div class="button-done-block">
            <button class="button-done" :class="{'isCompleted': data.isCompleted}" @click.prevent="completedTask"></button>
        </div>
        <div class="name">
            <input  class="input-task" 
                    @input="changeSubtaskText"
                    @keydown.enter.prevent="allowEditAndSubmit"
                    :class="{'allow-edit': isUserEdit, 'isCompleted-task-text': data.isCompleted}" 
                    type="text" 
                    :value="newTaskText"
                    >
        </div>
        <div class="action-buttons">
            <button class="button" @click.prevent="allowEditAndSubmit">
                <span v-if="!isUserEdit">
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20" height="20" fill="none" viewBox="0 0 192 192">
                        <g stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="12">
                            <path d="M26.25 131.62 22 170l38.38-4.25L170 56.07V43.14L148.86 22h-12.93zm98.17-96.96 31.67 31.67" class="cls-1"/>
                            <path stroke-miterlimit="5" d="M117.73 73.92 64.85 126.8"/>
                        </g>
                    </svg>
                </span>
                <span v-else >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.7 14.3 9.6 19 20.3 5"/></svg>
                </span>
            </button>
            <button class="button" @click.prevent="deleteSubtask">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <g stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M9 5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9V5Z"/>
                        <path d="M9 5H7a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3m5-16h2a2 2 0 0 1 2 2v5m-5 4 2.5 2.5M19 21l-2.5-2.5m0 0L19 16m-2.5 2.5L14 21"/>
                    </g>
                    </svg>
                </span>
            </button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.subtask {
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 8px 15px;
    margin-right: 10px;
    transition-duration: 400ms;
    outline: solid 1px transparent;
    &:hover {
        outline: solid 1px #e6e6e6;
        .button {
            visibility: visible;
            opacity: 1;
        }
    }
}
.button-done-block {
    width: 20px;
    margin-right: 15px;
}
.button-done {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: solid 2px #c2c2c2;
    cursor: pointer;
}
.name {
    flex-grow: 1;
}
.action-buttons {
    display: flex;
}
.button {
    visibility: hidden;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition-duration: 400ms;
    margin-left: 10px;
    &:hover path {
        stroke: #da0404da;
    }
}
.input-task {
    width: 100%;
    outline-color: transparent;
    user-select: none;
    pointer-events: none;
    padding: 5px 10px;
}
.allow-edit {
    user-select: unset;
    pointer-events: unset;
    outline: solid 1px #e9e9e9;
    border-radius: 5px;
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