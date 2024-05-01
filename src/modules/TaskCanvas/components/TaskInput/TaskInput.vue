<script setup>
import { ref, computed } from "vue";
import typeIcon from "../../../../assets/svg/typeTask.svg";
import assigneesIcon from "../../../../assets/svg/assignees.svg";
import projectIcon from "../../../../assets/svg/project.svg"
import { LS } from "../../../../helpers/LocalStorageAction";

const maxLentgthArea = 200;
const isFocus = ref(false);

const props = defineProps({
    nameTaskInput: String,
    changeState: Function,
    date: String,
})

const createFocus = () => {
    if (!isFocus.value) {
        isFocus.value = true;
    }
    setTimeout(() => isFocus.value = false, 8000);
}

const countInjectedLetters = computed(() => {
    return maxLentgthArea - props.nameTaskInput.length;
})

const createTask = (e) => {
    e.target.value = '';
    LS.createTask(props.date, props.nameTaskInput);
    props.changeState()
}

</script>

<template>
    <div class="task_input-block">
        <div class="task_text-area" @click="createFocus">
            <textarea @input="$emit('name-task', $event.target.value)" 
                                        @keydown.enter.prevent="createTask"
                                        class="text_area" 
                                        :v-bind="nameTaskInput"
                                        :maxlength="maxLentgthArea" 
                                        placeholder="Text of task"></textarea> 
                                        </div>
                                        <div :class="isFocus ? 'task_input-info' : 'task_info-animation'">
            <div class="task_input__maxlength">{{countInjectedLetters}}</div>
            <div class="task_input__hint" @click="createTask">Press Enter</div>
            <div class="task_input__info-task">
                <ul class="task_input__icons">
                    <li class="task_type"><img :src="typeIcon" alt="type"></li>
                    <li class="task_assignees"><img :src="assigneesIcon" alt="assignees"></li>
                    <li class="task_project"><img :src="projectIcon" alt="project"></li>
                </ul>
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .task_text-area {
        height: 35px;
        padding-top: 5px;
        width: 100%;
        background-color: #fff;
        border-radius: 6px;
        overflow: hidden;
    }
    .text_area {
        display: inline-block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        resize: none;
        padding: 5px 15px;
        font-size: 14px;
        &:focus {
            outline: none;
        }
    }
    .task_input-info {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 5px 15px;
        transition-duration: 250ms;
        opacity: 1;
        background-color: #fff;
    }
    .task_info-animation {
        height: 0;
        visibility: hidden;
        opacity: 0;
        transition-duration: 250ms;
        div {
            display: none;
        }
    }

    @mixin colorSize {
        font-size: 13px;
        text-align: center;
        color: #b3b3b3;
    }

    .task_input__maxlength {
        width: 10%;
        @include colorSize;
    }
    .task_input__hint {
        flex-grow: 1;
        @include colorSize;
        transition-duration: 200ms;
        cursor: pointer;
        &:hover {
            color: #e40000;
        }
    }
    .task_input__info-task {
        width: 30%;
    }
    .task_input__icons {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        li {
            margin: 0 3px;
            cursor: pointer;
        }
    }
    
</style>
