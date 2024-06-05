<script setup>
import LineActionsTask from "../components/LineActionsTask/LineActionsTask.vue";
import RowInfoTask from "../components/RowInfoTask/RowInfoTask.vue";

const props = defineProps({
    data: Object,
    name: String,
});



</script>

<template>
    <div class="task-panel-side">
        <div class="wrapper_content">
            <LineActionsTask :data="data"/>
            <div class="task-panel__name">
                <h2>{{ props.name }}</h2>
            </div>
            <div class="task-panel__rows-info">
                <RowInfoTask :assignees="props.data.assignees"
                            :type="props.data.type"
                            :timeLimit="props.data.timeLimit"
                            :date="props.data.date"
                            :id="props.data.id"
                            :priority="props.data.priority"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wrapper_content {
        position: relative;
        z-index: 99999;
        padding: 30px;
        overflow-y: auto;
        height: 70%;
    }
    .task-panel-side {
        position: fixed;
        right: calc(50%);
        top: 40px;
        bottom: 40px;
        width: 58%;
        transform: translate3d(50%, 0, 0);
        box-shadow: 0 2px 10px 0 #d4d4d4d8;
        border-radius: 3px;
        overflow: hidden;
        background-color: #fff;
    }
    .task-panel__name {
        h2 {
            font-size: 1.9rem;
        }
    }

</style>