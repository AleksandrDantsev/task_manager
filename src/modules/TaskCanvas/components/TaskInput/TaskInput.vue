<script setup>
import typeIcon from "../../../../assets/svg/typeTask.svg";
import assigneesIcon from "../../../../assets/svg/assignees.svg";
import projectIcon from "../../../../assets/svg/project.svg"
</script>

<template>
    <div class="task_input-block">
        <div class="task_text-area">
            <textarea maxlength="200" placeholder="Text of task"></textarea>
        </div>
        <div class="task_input-info">
            <div class="task_input__maxlength">200</div>
            <div class="task_input__hint">Press Enter</div>
            <div class="task_input__info-task">
                <ul>
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
        border-radius: 5px;
        overflow: hidden;
        
        textarea {
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
    }
    .task_input-info {
        background-color: #fff;
    }
    
</style>
