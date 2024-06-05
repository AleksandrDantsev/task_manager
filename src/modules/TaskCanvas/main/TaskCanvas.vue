<script setup>
import TaskDate from '../components/TaskDate/TaskDate.vue';
import TaskInput from '../components/TaskInput/TaskInput.vue';
import TaskCard from '../components/TaskCard/TaskCard.vue';
import { ref, computed } from 'vue';
import { useStore } from "vuex";

const props = defineProps({
    date: String,
});

const nameTask = ref('');
const store = useStore();

const cards = computed(() => store.getters.getSortedTask([props.date, store.state.projectsStore.currentProject]));


</script>

<template>
    <div class="task-canvas">
        <TaskDate :date="props.date"/>
        
        <TaskInput @name-task="value => nameTask = value"
                    :nameTaskInput="nameTask" 
                    :date="props.date"/>

        <div class="tasks-box">
            <TaskCard v-for="(item, i) of cards"
                        :key="item['id']"
                        :id="item.id" 
                        :date="props.date"
                        :number="i + 1"
                        :name="item['taskName']"
                        :project="item.project"
                        :assignees="assignees"
                        />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .task-canvas {
        min-width: 290px;
        margin-left: 5px;
        padding: 5px;
        
    }
    .tasks-box {
        padding-right: 5px;
        height: 82%;
        overflow-y: auto;
    }
</style>
