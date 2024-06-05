<script setup>
import { computed } from "vue";
    const props = defineProps({
        levelSubtasks: Array,
        place: String,
    });

    const stageFillCompletedTask = computed(() => {
        return Math.round(props.levelSubtasks[0] / props.levelSubtasks[1] * 100);
    })

</script>

<template>
    <div v-if="levelSubtasks[1] > 0" class="completed-subtasks">
        <div class="level-completed-subtasks" :class="{'fat': place === 'menu'}">
            <div class="line-fill" :style="{'width': stageFillCompletedTask + '%'}"></div>
        </div>
        <div v-if="place === 'card'" class="completed-subtasks-numbers">{{ levelSubtasks[0] }} / {{ levelSubtasks[1] }}</div>
    </div>
</template>

<style lang="scss" scoped>
    .completed-subtasks {
        display: flex;
        align-items: center;
        margin: 10px 0 5px 0;
    }
    .level-completed-subtasks {
        width: 100%; 
        height: 2px;
        margin-right: 10px;
        background-color: #dfdfdf;
    }
    .fat {
        height: 3px;
        margin-right: 0;
    }
    .completed-subtasks-numbers {
        width: 15%;
        font-size: 14px;
        color: #888686;
        white-space: nowrap;
    }
    .line-fill {
        height: 100%;
        border-radius: 3px;
        transition-duration: 500ms;
        background-color: #e70505c0;
    }
</style>