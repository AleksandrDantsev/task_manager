<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AssigneesCard from './AssigneesCard/AssigneesCard.vue';

const props = defineProps({
    date: String,
    id: Number,
});

    const store = useStore();
    
    const inputValue = ref('');

    const getInputValue = (e) => {
        inputValue.value = e.target.value;
    }

    const infoUser = computed(() => store.state.infoUser.infoUserState).value;

    const assignees = computed(() => {
        if (infoUser.firstName && infoUser.lastName) {
            return [infoUser.firstName + ' ' + infoUser.lastName];
        }
        return [];
    })

    const setAssignee = (e) => {
        const idTarget = e.target.id;
        const nameProject = store.state.projectsStore.currentProject;

        if (idTarget) {
            store.changeValueTask([
                props.date,
                idTarget,
                props.id,
                "assignees",
                nameProject,
            ])
        }
    }

</script>

<template>
    <div class="assignees-wrapper">
        <input class="assignees-input" type="text" placeholder="Assignees..." @input="getInputValue">
        <div class="assignees-list-wrapper">
            <ul class="assignees-list" @click="setAssignee">
                <li v-for="assignee of assignees" 
                        :key="assignee"
                        :id="'assignee-' + assignee">
                        <AssigneesCard :name="assignee" :avatar="infoUser.avatarImage"/>
                </li>       
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$heightInput: 30px;
.assignees-wrapper {
    width: 100%;
    height: 100%;
}
.assignees-input {
    width: 100%;
    height: $heightInput;
    padding: 0 10px;
    background-color: #f1f1f1;
}
.assignees-list-wrapper {
    width: 100%;
    max-height: calc(100% - $heightInput);
    overflow-y: auto;
}
.assignees-list {

}
</style>