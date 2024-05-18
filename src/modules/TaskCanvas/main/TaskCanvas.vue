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

const cards = computed(() => store.state.tasksLocalArray[props.date]);


</script>

<template>
    <div class="task-canvas">
        <TaskDate :date="props.date"/>
        
        <TaskInput @name-task="value => nameTask = value"
                    :nameTaskInput="nameTask" 
                    :date="props.date"/>

        <div class="tasks_box">
            <TaskCard v-for="(item, i) of cards"
                        :key="item['id']"
                        :id="item.id" 
                        :date="props.date"
                        :number="i + 1"
                        :name="item['taskName']"
                        />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .task-canvas {
        min-width: 270px;
        padding: 5px;
        margin-left: 5px;
    }
</style>
