<script setup>
import TaskCard from '../../TaskCanvas/components/TaskCard/TaskCard.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

    const store = useStore();

    const binTasks = computed(() => {
        return store.state.infoTask.binCard || [];
    })

</script>

<template>
    <div class="list-bin-tasks">
        <div class="line-subhead">
            <div class="title">Bin</div>
            <div class="close-bin">
                <svg data-v-cc243a1d="" data-v-2e170f8e="" data-v-792b3c77="" data-v-d7e04b56="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 20px; width: 20px; fill: rgb(179, 179, 179);"><path data-v-cc243a1d="" data-v-2e170f8e="" opacity="0.39" d="M14.8 13.4L18.7 17.3C19.1 17.7 19.1 18.3 18.7 18.7C18.3 19.1 17.7 19.1 17.3 18.7L13.4 14.8C13 14.4 13 13.8 13.4 13.4C13.8 13 14.4 13 14.8 13.4Z" fill="##b3b3b3"></path><path data-v-cc243a1d="" data-v-2e170f8e="" d="M6.70002 18.7C6.30002 19.1 5.7 19.1 5.3 18.7C4.9 18.3 4.9 17.7 5.3 17.3L10.6 12L5.3 6.70002C4.9 6.30002 4.9 5.7 5.3 5.3C5.7 4.9 6.30002 4.9 6.70002 5.3L12 10.6L17.3 5.3C17.7 4.9 18.3 4.9 18.7 5.3C19.1 5.7 19.1 6.30002 18.7 6.70002L6.70002 18.7Z" fill="##b3b3b3"></path></svg>
            </div>
        </div>
        <div v-if="binTasks.length" class="conteiner-tasks">
                <TaskCard v-for="(item, i) of binTasks"
                            :position="'bin'"
                            :key="item['id']"
                            :id="item.id" 
                            :date="item.date"
                            :number="i + 1"
                            :project="item.project"
                            :name="item['taskName']"
                            :assignees="assignees"
                />
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    .list-bin-tasks {
        height: 100%;
        padding: 10px;
    }
    .line-subhead {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
        height: 10%;
        margin-bottom: 10px;
    }
    .conteiner-tasks {
        height: 80%;
        overflow-y: auto;
    }
    .title {
        font-size: 20px;
        font-weight: 600;
        color: #4d4d4d;
    }
</style>
