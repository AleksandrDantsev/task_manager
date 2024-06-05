<script setup>
import { ref } from "vue";
import { useStore } from 'vuex';
import { capitalize } from "../../../../helpers/capitalize";

    const props = defineProps({
        id: Number,
        date: String,
    });

    const valueSubtask = ref();
    const store = useStore();

    const inputSubtask = (e) => {
        const target = e.target
        valueSubtask.value = target.value;
    }

    const addToStoreSubtask = () => {
        const idTask = (new Date()).getTime();
        const capitalizeName = capitalize(valueSubtask.value);

        if (capitalizeName.length) {
            const nameProject = store.state.projectsStore.currentProject;
            store.commit("addCommentOrSubtask", [
                props.date, 
                props.id, 
                {name: capitalizeName, isCompleted: false, id: idTask},
                "subtasks",
                nameProject,
            ]);
            valueSubtask.value = '';
        }
    }

</script>
<template>
    <div class="input-subtask-conteiner">
        <div class="icon-subtask">
            <svg xmlns="http://www.w3.org/2000/svg" height="27px" width="27px" fill="none" viewBox="0 0 24 24">
            <g fill="#b3b3b3">
                <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-16.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z"/>
                <path d="M12 16.75a.76.76 0 0 1-.75-.75V8a.75.75 0 1 1 1.5 0v8a.76.76 0 0 1-.75.75Z"/>
                <path d="M16 12.75H8a.75.75 0 1 1 0-1.5h8a.75.75 0 1 1 0 1.5Z"/>
            </g>
            </svg>
        </div>
        <input @input="inputSubtask"
                @keydown.enter="addToStoreSubtask" 
                type="text" 
                class="input-subtask" 
                placeholder="New task..."
                v-model="valueSubtask">
    </div>
</template>
<style scoped lang="scss">
    $conteinerMargins: 8px 17px;
    .input-subtask-conteiner {
        display: flex;
        margin: $conteinerMargins;
        padding: 5px 0;
    }
    .input-subtask {
        padding: 0 10px;
        padding-left: 20px;
        border: 0;
        width: 100%;
        &:focus {
            outline: none;
        }
    }
</style>