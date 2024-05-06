<script setup>
import { ref, computed } from "vue";
import buttonSquare from '../../../../UI/button-square.vue';
import ConfirmWindow from "../../../../UI/confirm-window.vue";
import { useStore } from "vuex";
import shadow from "../../../../hoc/shadow.vue";
import MoveJoystick from "../MoveJoystick/MoveJoystick.vue";

const props = defineProps({
    nameProject: String,
    name: String,
    date: String,
    number: Number,
    id: Number,
});

const store = useStore();
const necesseryLevel = ref(0);
const isDeleteConfirmOpen = ref(false);


const level = computed(() => {
    const dataArray = store.state.tasksLocalArray?.[props.date] || [];
    return dataArray.length ? dataArray.find(el => el.id === props.id).priority : '';
})

const changeNecessaryLevel = () => {
    const priority = ["low", "middle", "high"];
    store.commit("changePriority", [props.date, priority[necesseryLevel.value], props.id])

    necesseryLevel.value < 3 ? necesseryLevel.value += 1 : necesseryLevel.value = 0;
}

const openDeleteWindow = () => isDeleteConfirmOpen.value = true;;

const deleteTask = (neededDelete) => {
    if (neededDelete) {
        store.commit('deleteTask', {date: props.date, id: props.id})
    }
    isDeleteConfirmOpen.value = false;
}

const openInfoPanel = (e) => {
    e.stopPropagation();
    store.commit("changeInfoTask", {date: props.date, id: props.id});
    store.commit("togglePanel", true);
}

</script>

<template>
    <div class="task_card" :class="`${level}-color-border`">
        <shadow :isOpenWindow="isDeleteConfirmOpen" 
                @close-window="(isCurrentTarget) => {isCurrentTarget ? isDeleteConfirmOpen = false : ''}">
                <ConfirmWindow :text="'Are you sure that you want to delete the task?'" :deleteTask="deleteTask"/>
        </shadow>
        <div class="task_card__level_side" :class="`${level}-background`"></div>
        <div class="task_card__icons">
            <ul class="task_card__actions">
                <li class="task_card__number">
                    <buttonSquare :content="'#' + props.number" />
                </li>
                <li class="task_card__parent-task" @click="openInfoPanel">
                    <svg fill="#b3b3b3" width="18" height="25" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M15 32h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Zm-3-2h2v-2h-2Z" class="clr-i-outline clr-i-outline-path-1"/><path d="M15 16h-4a1 1 0 0 0-1 1v1.2H5.8V12H7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1.2v17.8h6.36a.8.8 0 0 0 0-1.6H5.8v-8.4H10V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM4 8h2v2H4Zm10 12h-2v-2h2Z" class="clr-i-outline clr-i-outline-path-2"/><path d="M34 9a1 1 0 0 0-1-1H10v2h23a1 1 0 0 0 1-1Z" class="clr-i-outline clr-i-outline-path-3"/><path d="M33 18H18v2h15a1 1 0 0 0 0-2Z" class="clr-i-outline clr-i-outline-path-4"/><path d="M33 28H18v2h15a1 1 0 0 0 0-2Z"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                </li>
                <li class="task_card__comments" @click="openInfoPanel">
                    <svg width="18" height="23" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill-rule="evenodd" clip-rule="evenodd" d="m4 11.29 1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5v1.79zM10.29 13l1.86 1.85.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5h3.79zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14-.35-.15z"/></svg>
                </li>
                <li class="task_card__delete_task" @click="openDeleteWindow">
                    <svg width="17" height="25" viewBox="0 0 1000 910" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/></svg>
                </li>
            </ul>
            <MoveJoystick :id="props.id" :date="props.date"/>
        </div>
        <div class="task_card__project_name">
            {{ props.nameProject || ''}}
        </div>
        <div class="task_card__description">
            {{ props.name }}
        </div>
        <div class="task_card__info-buttons">
            <div class="task_card__assignees" @click="openInfoPanel">
                <svg fill="#b3b3b3" width="20" height="20" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M28 51.9A24.08 24.08 0 0 0 51.9 28 24.12 24.12 0 0 0 27.99 4.1 24.06 24.06 0 0 0 4.09 28 24.07 24.07 0 0 0 28 51.9Zm0-3.98A19.83 19.83 0 0 1 8.1 28 19.82 19.82 0 0 1 27.98 8.08 19.91 19.91 0 0 1 47.92 28 19.85 19.85 0 0 1 28 47.92Zm0-21.23c3.4.02 6.12-2.89 6.12-6.7 0-3.57-2.72-6.54-6.12-6.54s-6.12 2.97-6.12 6.53c0 3.82 2.72 6.68 6.12 6.7ZM17.08 39.98H38.9c.94 0 1.4-.64 1.4-1.48 0-2.63-3.93-9.4-12.3-9.4-8.37 0-12.3 6.77-12.3 9.4 0 .84.46 1.48 1.38 1.48Z"/></svg>
            </div>
            <div class="task_card__necessary_level" @click="changeNecessaryLevel">
                <div class="necessary_level__one" :class="necesseryLevel && level"></div>
                <div class="necessary_level__two" :class="necesseryLevel >= 2  && level"></div>
                <div class="necessary_level__three" :class="necesseryLevel == 3 && level"></div>
            </div>
            <div class="task_card__done">
                <button type="button" class="task_card__done-bt">
                    <svg width="12" height="12" viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.7 14.3 9.6 19 20.3 5"/></svg>
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">

    .task_card__level_side {
        position: absolute;
        height: 25px;
        width: 9px;
        right: 0;
        top: calc(50% - 25px / 2);
        border-radius: 3px 0 0 3px;
    }
    .task_card {
        position: relative;
        padding: 10px 15px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #fff;
        &:hover .task_card__move-joystick{
            visibility: visible;
            opacity: 1;
        }
    }
    .task_card__actions {
        display: flex;
        li {
            cursor: pointer;
            margin-right: 10px;
            svg {
                transition-duration: 500ms;
                &:hover {
                    fill: #0553c9;
                }
            }
        }
    }
    .task_card__delete_task {
        svg:hover {
            fill: #e40000 !important;
        }
    }
    .task_card__assignees {
        svg {
            cursor: pointer;
            transition-duration: 500ms;
        }
        svg:hover {
            fill:rgb(1, 177, 1)
        }
    }
    .task_card__icons {
        display: flex;
        justify-content: space-between;
    }
    .task_card__done button {
        border-radius: 50%;
        height: 15px;
        width: 15px;
        outline: solid 1px #d4d4d4d8;
        cursor: pointer;
        svg {
            transition-duration: 200ms;
            opacity: 0;
        }
        &:hover {
            svg {
                opacity: 1;
            }
        }
    }
    .task_card__project_name {
        font-size: 12px;
        color: green;
        margin-top: 10px;
    }
    .task_card__description {
        padding-top: 10px;
        width: 100%;
    }
    .task_card__info-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
    }
    .task_card__done {
        display: flex;
        align-items: center;
    }
    .task_card__necessary_level {
        display: flex;
        align-items: center;
        height: 18px;
        cursor: pointer;
        div {
            width: 5px;
            height: 5px;
            margin: 3px;
            border-radius: 50%;
            background-color: #ccccccd8;
            transition-duration: 700ms;
        }
    }
    .low {
        background-color: #28c928cc !important;
    }
    .middle {
        background-color: #f5f509 !important;
    }
    .high {
        background-color: red !important;
    }
    @mixin setStyleLevel($color) {
        transition-duration: 1s;
        border-radius: 5px;
        box-shadow: 0 0 4px 0 $color;
    }
    .low-color-border {
        @include setStyleLevel(#16bb16cc);
    }
    .middle-color-border {
        @include setStyleLevel(#f2db08);
    }
    .high-color-border {
        @include setStyleLevel(#d40707c0);
    }

    @mixin setBackColor($color) {
        transition-duration: 500ms;
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
