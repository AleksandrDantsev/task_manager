<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import LevelCompletedTask from "../../../../components/LevelCompletedTask/LevelCompletedTask.vue";

    const store = useStore();

    const levelSubtasks = computed(() => {
        const nameProject = store.state.projectsStore.currentProject;
        return store.getters.getQuantityCompletedTasks(nameProject);
    })

</script>

<template>
    <div class="indicator-wrapper">
        <div v-if="levelSubtasks[1] > 0" class="indicator">
            <div class="text-state">{{ levelSubtasks[0] }} of {{ levelSubtasks[1] }} tasks completed</div>
            <LevelCompletedTask :levelSubtasks="levelSubtasks" :place="'menu'"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .indicator-wrapper {
        bottom: 20px;
        width: 92%;
        margin: 20px auto;
        padding: 15px 10px 10px 10px;
    }
    .text-state {
        font-size: 14px;
    }
    .indicator {
        width: 100%;
        margin: 0 auto;
    }
</style>