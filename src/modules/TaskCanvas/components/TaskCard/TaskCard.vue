<script setup>
import { ref } from "vue";
import buttonSquare from '../../../../UI/button-square.vue';
import { LS } from "../../../../helpers/LocalStorageAction";

const colors = {
    colorsLevel: ["green", "yellow", "red"],
    colorsLevelOutline: ["greenOutline", "yellowOutline", "redOutline"],
    marker: ["#38eb38cc", "#f5f509", "#e40000"],
}

const props = defineProps({
    nameProject: String,
    name: String,
    date: String,
    changeState: Function,
    number: Number,
});
const necesseryLevel = ref(0);

const changeNecessaryLevel = () => {
    if (necesseryLevel.value < 3) necesseryLevel.value = necesseryLevel.value + 1;
    else necesseryLevel.value = 0;
}

const deleteTask = () => {
    LS.deleteTask(props.date, props.name)
    props.changeState();
}

</script>

<template>
    <div class="task_card" :class="colors.colorsLevelOutline[necesseryLevel-1]">
        <div class="task_card__level_side" :style="{'background-color': colors.marker[necesseryLevel-1]}"></div>
        <div class="task_card__icons">
            <ul>
                <li class="task_card__number">
                    <buttonSquare :content="'#' + props.number" />
                </li>
                <li class="task_card__parent-task"></li>
            </ul>
            <div class="task_card__move-joystick">
                <div class="joystick-left">
                    <div class="left_move">
                        <svg fill="#d4d4d4d8" width="30" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3 12 3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z"/></svg>
                        <!-- <img :src="angleIcon" alt="left"> -->
                    </div>
                </div>
                <div class="joystick-top-bottom">
                    <div class="top_move">
                        <svg fill="#d4d4d4d8" width="30" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3 12 3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z"/></svg>
                    </div>
                    <div class="bottom_move">
                        <svg fill="#d4d4d4d8" width="30" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3 12 3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z"/></svg>
                    </div>
                </div>
                <div class="joystick-right">
                    <div class="right_move">
                        <svg fill="#d4d4d4d8" width="30" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3 12 3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z"/></svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="task_card__project_name">
            {{ props.nameProject ?? 'Project'}}
        </div>
        <div class="task_card__description">
            {{ props.name }}
        </div>
        <div class="task_card__info-buttons">
            <div class="task_card__assignees">
                <buttonSquare :content="'#1'" />
            </div>
            <div class="task_card__necessary_level" @click="changeNecessaryLevel">
                <div class="necessary_level__one" :class="colors.colorsLevel[necesseryLevel-1]"></div>
                <div class="necessary_level__two" :class="necesseryLevel >= 2 && colors.colorsLevel[necesseryLevel-1]"></div>
                <div class="necessary_level__three" :class="necesseryLevel >= 3 && colors.colorsLevel[necesseryLevel-1]"></div>
            </div>
            <div class="task_card__done" @click="deleteTask">
                <button type="button" class="task_card__done-bt"> </button>
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
        margin: 15px 0;
        border-radius: 10px;
        background-color: #fff;
        &:hover .task_card__move-joystick{
            visibility: visible;
            opacity: 1;
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
    }
    .task_card__project_name {
        font-size: 12px;
        color: green;
        margin-top: 10px;
    }
    .task_card__description {
        padding-top: 10px;
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
        height: 18px;
        width: 30px;
        cursor: pointer;
        div {
            align-self: end;
            width: 4px;
            margin: 2px;
            border-radius: 2px;
            background-color: #ccccccd8;
            transition-duration: 700ms;
        }
    }
    .necessary_level__one {
        height: 35%;
    }
    .necessary_level__two {
        height: 65%;
    }
    .necessary_level__three {
        height: 100%;
    }
    .task_card__move-joystick {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 10px;
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition-duration: 300ms;
    }
    @mixin rotate($degree) {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 21px;
        transform: rotate($degree);
        cursor: pointer;
        &:hover {
            svg {
                fill: #e40000;
            }
        }
    }
    .joystick-top-bottom {
        display: flex;
        flex-direction: column;
    }
    .left_move {
        @include rotate(0);
    }
    .top_move {
        @include rotate(90deg);
    }
    .bottom_move {
        @include rotate(270deg);
    }
    .right_move {
        @include rotate(180deg);
    }
    .green {
        background-color: rgb(32, 204, 9) !important;
    }
    .yellow {
        background-color: #f5f509 !important;
    }
    .red {
        background-color: red !important
    }
    @mixin setStyleLevel($color) {
        transition-duration: 1s;
        border-radius: 5px;
        box-shadow: 0 0 4px 0 $color;
    }
    .greenOutline {
        @include setStyleLevel(#38eb38cc);
    }
    .yellowOutline {
        @include setStyleLevel(#f2db08);
    }
    .redOutline {
        @include setStyleLevel(#d40707c0);
    }
</style>
