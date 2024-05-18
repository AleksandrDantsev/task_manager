<script setup>
import MyTasksListBlock from '../components/MyTasksListBlock/MyTasksListBlock.vue';
import { computed } from "vue";
import { useStore } from "vuex";
import { getReadableDate } from '../../../helpers/getReadableDate';

const store = useStore();

const allTasks = computed(() => {
    return store.state.tasksLocalArray;
})

const days = computed(() => {
    const today = getReadableDate(0);
    const yesterday = getReadableDate(1);
    const tomorrow = getReadableDate(-1);

    const objectDays = {
        "yersterday": yesterday,
        "today": today,
        "tomorrow": tomorrow,
    };

    const formatedDate = Object.values(objectDays);
    const otherDays = [];

    for (let [date, item] of Object.entries(allTasks.value)) {
        if (!formatedDate.includes(date)) otherDays.push(...item);
    }
    console.log(otherDays)
    return [objectDays, otherDays];
})

</script>

<template>
    <div class="my-task-list">
        <div class="title">
            <h1>My tasks</h1>
        </div>
        <div class="table-tasks">
            <div class="line-names">
                <ul class="titles-list">
                    <li class="task-name">Tasks</li>
                    <li class="task-project">Project</li>
                    <li class="task-assignee">Assignee</li>
                    <li class="task-date">Date</li>
                </ul>
            </div>
        </div>
        <div class="conteiner-tasks">
            <div class="day-tasks-wrap" v-if="days[0]['tomorrow'] in allTasks && allTasks[days[0]['tomorrow']].length">
                <MyTasksListBlock :data="allTasks[days[0]['tomorrow']]" :day="'Tomorrow'"
                />
            </div>


            <div class="day-tasks-wrap" v-if="days[0]['today'] in allTasks && allTasks[days[0]['today']].length">
                <MyTasksListBlock :data="allTasks[days[0]['today']]" :day="'Today'"
                />
            </div>


            <div class="day-tasks-wrap" v-if="days[0]['yersterday'] in allTasks && allTasks[days[0]['yersterday']].length">
                <MyTasksListBlock :data="allTasks[days[0]['yersterday']]" :day="'Yersterday'"
                />

            </div>

            <div class="day-tasks-wrap" v-if="days[1].length && days[1].length" >
                <MyTasksListBlock :data="days[1]" :day="'Other days'"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .my-task-list {
        width: 95%;
        margin: 20px auto;
    }
    .title {
        
    }
    .table-tasks {
        width: 100%;
    }
    .line-names {
        width: 100%;
        padding: 10px 0 15px 0;
        padding-left: 20px;
        border-bottom: solid 1px #e6e6e6;
    }
    .titles-list {
        display: flex;
        width: 100%;
        justify-content: space-between;
        li {
            font-weight: 600;
            color: #616161;
        }
    }
    .task-name {
        width: 40%;
    }
    .task-project {
        width: 20%;
    }
    .task-assignee {
        width: 20%;
    }
    .task-date {
        width: 20%;
    }
    .conteiner-tasks {
        
    }
</style>