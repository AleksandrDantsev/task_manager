<script setup>
import MyTasksListBlock from '../components/MyTasksListBlock/MyTasksListBlock.vue';
import { computed } from "vue";
import { useStore } from "vuex";
import { getReadableDate } from '../../../helpers/getReadableDate';

const store = useStore();

const allTasks = computed(() => {
    const tasks = store.state.infoTask.tasksLocalArray;
    console.log(tasks)
    return Object.keys(tasks).length ? tasks : false;
})

const days = computed(() => {
    if (allTasks.value) {
        const getDaysTasks = (tasksObj) => { 
            const obj = {};
            for (let projectName in tasksObj) { // projectName: {sat: [{}, {}]}
                for(let date in tasksObj[projectName]) { // date: [{}, {}]
                    if (obj[date]) {
                        obj[date].push(...tasksObj[projectName][date]);
                    }	
                    else obj[date] = tasksObj[projectName][date];
                }
            }
            return obj 
        }    
        const today = getReadableDate(0);
        const yesterday = getReadableDate(1);
        const tomorrow = getReadableDate(-1);

        const objectDays = {
            "yesterday": yesterday,
            "today": today,
            "tomorrow": tomorrow,
        };

        const formatedDate = Object.values(objectDays);
        const nearlyDays = {
            "yesterday": [],
            "today": [],
            "tomorrow": [],
            "otherDays": [],
        }
        const tasksSpreadByDate = getDaysTasks(allTasks.value);
        console.log(formatedDate)
        console.log(tasksSpreadByDate)

        for (let [date, item] of Object.entries(tasksSpreadByDate)) {

            if (!formatedDate.includes(date)) nearlyDays['otherDays'].push(...item);
            else {
                if (yesterday === date) nearlyDays['yesterday'] = item;
                else if (tomorrow === date) nearlyDays['tomorrow'] = item;
                else if (today === date) nearlyDays['today'] = item;
            }
        }
        console.log(nearlyDays)
        return [objectDays, nearlyDays];
    }
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
        <div v-if="allTasks" class="conteiner-tasks">
            <div class="day-tasks-wrap" v-if="days[1]['tomorrow'].length">
                <MyTasksListBlock :data="days[1]['tomorrow']" :day="'Tomorrow'"
                />
            </div>


            <div class="day-tasks-wrap" v-if="days[1]['today'].length">
                <MyTasksListBlock :data="days[1]['today']" :day="'Today'"
                />
            </div>


            <div class="day-tasks-wrap" v-if="days[1]['yesterday'].length">
                <MyTasksListBlock :data="days[1]['yesterday']" :day="'yesterday'"
                />

            </div>

            <div class="day-tasks-wrap" v-if="days[1]['otherDays'].length" >
                <MyTasksListBlock :data="days[1]['otherDays']" :day="'Other days'"
                />
            </div>
        </div>
        <div v-else class="empty-list-task">
            <div class="empty-list-task-title">Your task list is empty</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .my-task-list {
        width: 95%;
        margin: 20px auto;
        height: 85%;
        overflow-y: auto;
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
    .empty-list-task {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50%;
    }
    .empty-list-task-title {
        font-size: 20px;
        color: #8b8b8b;
    }
</style>