<script setup>
import joystick_arrow from "../../../../UI/joystick-arrow.vue";
import { useStore } from "vuex";

const props = defineProps({
    date: String,
    id: Number,
})

const store = useStore();
// date, id, position
const moveTaskIntoSibling = (direction) => {
    const nameProject = store.state.projectsStore.currentProject;
    store.commit("moveTask", [props.date, props.id, direction, nameProject])
}

</script>

<template>
    <div class="task_card__move-joystick">
        <div class="joystick-left" @click="() => moveTaskIntoSibling('left')">
            <joystick_arrow :classname="'left_move'"/>
        </div>
        <div class="joystick-top-bottom">
            <joystick_arrow :classname="'top_move'" @click="() => moveTaskIntoSibling('up')"/>
            <joystick_arrow :classname="'bottom_move'" @click="() => moveTaskIntoSibling('down')"/>
        </div>
        <div class="joystick-right">
            <joystick_arrow :classname="'right_move'" @click="() => moveTaskIntoSibling('right')"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .task_card__move-joystick {
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 8px;
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition-duration: 300ms;
    }

    .joystick-top-bottom {
        display: flex;
        flex-direction: column;
    }


</style>