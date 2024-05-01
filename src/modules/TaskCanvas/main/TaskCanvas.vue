<script setup>
import TaskDate from '../components/TaskDate/TaskDate.vue';
import TaskInput from '../components/TaskInput/TaskInput.vue';
import TaskCard from '../components/TaskCard/TaskCard.vue';
import { LS } from '../../../helpers/LocalStorageAction';
import { computed, ref, reactive, onMounted } from 'vue';

const props = defineProps({
    date: String,
});

const nameTask = ref('');
const cards = ref(LS.getTasks(props.date));

const changeState = () => cards.value = LS.getTasks(props.date);

</script>

<template>
    <div class="task-canvas">
        <TaskDate :date="props.date"/>
        <TaskInput @name-task="value => nameTask = value"
                    :changeState="changeState"
                    :nameTaskInput="nameTask" 
                    :date="props.date"/>
        <div class="tasks_box">
            <TaskCard v-for="(item, i) of cards"
                        :changeState="changeState" 
                        :key="item['id']" 
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
        padding: 10px;
        margin-left: 10px;
        
    }
</style>
