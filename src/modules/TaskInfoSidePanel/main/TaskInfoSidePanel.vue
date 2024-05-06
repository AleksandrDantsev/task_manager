<script setup>
import RowInfoTask from "../components/RowInfoTask/RowInfoTask.vue";

const props = defineProps({
    data: Object,
    name: String,
});


</script>

<template>
    <div class="task-panel-side">
        <div class="wrapper_content">
            <div class="task-panel__actions">
    
            </div>
            <div class="task-panel__name">
                <h2>{{ props.name }}</h2>
            </div>
            <div class="task-panel__rows-info">
                <RowInfoTask :assignees="props.data.assignees"
                            :type="props.data.type"
                            :timeLimit="props.data.timeLimit"
                            :date="props.data.date"
                            :priority="props.data.priority"
                            :subtasks="props.data.subtasks"
                            :comments="props.data.comments"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper_content {
        padding: 30px;
    }
    .task-panel-side {
        position: fixed;
        right: calc(50%);
        top: 40px;
        bottom: 40px;
        width: 50%;
        transform: translate3d(50%, 0, 0);
        box-shadow: 0 2px 10px 0 #d4d4d4d8;
        border-radius: 10px;
        background-color: #fff;
    }
    .task-panel__name {
        h2 {
            font-size: 2rem;
        }
    }
</style>