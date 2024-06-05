<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

    const props = defineProps({
        id: Number,
        date: String,
        level: String | null,
    });

    const store = useStore();
    const necesseryLevel = ref(0);

    

    const changeNecessaryLevel = () => {
        const priority = ["low", "middle", "high"];
        const nameProject = store.state.projectsStore.currentProject;
        store.commit("changeValueTask", [
                props.date, 
                priority[necesseryLevel.value], 
                props.id, 
                "priority",
                nameProject
            ]);

        necesseryLevel.value < 3 ? necesseryLevel.value += 1 : necesseryLevel.value = 0;
    }

</script>

<template>
    <div class="task_card__necessary_level" @click="changeNecessaryLevel">
        <div class="necessary_level__one" :class="necesseryLevel && level"></div>
        <div class="necessary_level__two" :class="necesseryLevel >= 2  && level"></div>
        <div class="necessary_level__three" :class="necesseryLevel == 3 && level"></div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>