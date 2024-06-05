<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import LevelTab from "./LevelTab/LevelTab.vue";
import DoneTask from "./DoneTask/DoneTask.vue";
import MoveJoystick from "../MoveJoystick/MoveJoystick.vue";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo.vue";
import TaskCardActions from "./TaskCardActions/TaskCardActions.vue";
import LevelCompletedTask from "../../../../components/LevelCompletedTask/LevelCompletedTask.vue";

    const props = defineProps({
        position: String,
        name: String,
        date: String,
        number: Number,
        project: String,
        id: Number,
        assignees: String | null,
    });
    const isBinPosition = props.position === 'bin';

    const store = useStore();
    const activeProject = computed(() => store.state.projectsStore.currentProject).value;

    const level = computed(() => {
        if (!isBinPosition) {
            const dataArray = store.state.infoTask.tasksLocalArray?.[activeProject]?.[props.date] || [];
            return dataArray.length ? dataArray.find(el => el.id === props.id).priority : '';
        }
        else return false;
    })

    const isCompletedTask = computed(() => {
        if (!isBinPosition) {
            return store.getters.getFieldFirstLevelTask([props.date, props.id, "complete", activeProject]);
        }
        else return false;
    })

    const levelSubtasks = computed(() => {
        return store.getters.getLevelSubtasks([props.date, props.id, activeProject]);
    })

</script>

<template>
    <div class="task_card" :class="isCompletedTask ? 'completed-task ' + `${level}-color-border` : `${level}-color-border`">
        <div v-if="!isBinPosition" class="task_card__level_side" :class="`${level}-background`"></div>
        <div class="task_card__icons">
            <TaskCardActions :id="id" :date="date" :number="number" :isBinPosition="isBinPosition"/>
            <MoveJoystick v-if="!isBinPosition" :id="id" :date="date"/>
        </div>
        <div class="task_card__description">
            <div class="task_card__project_name">{{ project || ''}}</div>
            <div class="task_card__task_name">{{ name }}</div>
        </div>
        <div class="task_card__info-buttons">
            <AdditionalInfo :id="id" :date="date" :assignees="assignees"/>
            <LevelTab v-if="!isBinPosition" :id="id" :date="date" :level="level" />
            <DoneTask v-if="!isBinPosition" :id="id" :date="date" :isCompletedTask="isCompletedTask" />
        </div>
        <LevelCompletedTask :levelSubtasks="levelSubtasks" :place="'card'" />
    </div>
</template>

<style scoped lang="scss">
    .completed-task {
        background-color: #0e0e0e04 !important;
    }
    .task_card__level_side {
        position: absolute;
        height: 25px;
        width: 6px;
        right: 0;
        top: calc(50% - 25px / 2);
        border-radius: 3px 0 0 3px;
    }
    .task_card {
        position: relative;
        padding: 10px 15px;
        margin: 10px 5px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 #cfcfcf98;
        &:hover .task_card__move-joystick{
            visibility: visible;
            opacity: 1;
        }
    }

    .task_card__icons {
        display: flex;
        justify-content: space-between;
    }

    .task_card__project_name {
        font-size: 12px;
        color: #54ad54;
        margin-bottom: 10px;
    }
    .task_card__description {
        font-size: 15px;
        padding: 10px 8px 0 8px;
        width: 100%;
    }
    .task_card__info-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
    }
    .task_card__done {
        display: flex;
        align-items: center;
    }

    @mixin setStyleLevel($color, $back) {
        transition-duration: 200ms;
        outline: solid 1px $color;
        background-color: $back;
    }
    .low-color-border {
        @include setStyleLevel(#16bb165d, #37f83700);
    }
    .middle-color-border {
        @include setStyleLevel(#f2db08be, #f8e21d00);
    }
    .high-color-border {
        @include setStyleLevel(#d40707d7, #fd3f3f00);
    }

    @mixin setBackColor($color) {
        transition-duration: 200ms;
        background-color: $color;
    }
    .low-background {
        @include setBackColor(#16bb16cc);
    }
    .middle-background {
        @include setBackColor(#f2db08);
    }
    .high-background {
        @include setBackColor(#d40707c0);
    }
</style>
