<script setup>
import EstimateWindow from "../EstimateWindow/EstimateWindow.vue";
import { useStore } from 'vuex';
import { reactive } from 'vue';
import CommentsField from '../CommentsField/CommentsField.vue';
import SubtaskField from "../SubtaskField/SubtaskField.vue";
import TaskInfoLane from '../TaskInfoLane/TaskInfoLane.vue';


    const props = defineProps({
            assignees: String | null,
            type: String,
            timeLimit: String | null,
            date: String,
            id: Number,
            priority: String | null,
    })

    const store = useStore();

    const isOpenForms = reactive({
        changePriority: false,
        Estimate: false,
    })

    const openOrCloseForm = (field, state) => {
        isOpenForms[field] = state; 
    }

    const setPriority = (priorityOpted) => {
        if (priorityOpted) {
            const currentTaskData = store.state.currentInfoEl;

            store.commit("changeValueTask", [
                currentTaskData['date'], 
                priorityOpted, 
                currentTaskData['id'], 
                "priority"
            ]);

            openOrCloseForm("changePriority", false);
        } 
    }

    const setEstimate = () => {

    }


</script>

<template>
    <div class="wrapper">
        <TaskInfoLane :name="'Assignees'" :textButton="'Change assignees'" :value="props.assignees" >
            <svg fill="#b3b3b3" width="22" height="22" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M28 51.9A24.08 24.08 0 0 0 51.9 28 24.12 24.12 0 0 0 27.99 4.1 24.06 24.06 0 0 0 4.09 28 24.07 24.07 0 0 0 28 51.9Zm0-3.98A19.83 19.83 0 0 1 8.1 28 19.82 19.82 0 0 1 27.98 8.08 19.91 19.91 0 0 1 47.92 28 19.85 19.85 0 0 1 28 47.92Zm0-21.23c3.4.02 6.12-2.89 6.12-6.7 0-3.57-2.72-6.54-6.12-6.54s-6.12 2.97-6.12 6.53c0 3.82 2.72 6.68 6.12 6.7ZM17.08 39.98H38.9c.94 0 1.4-.64 1.4-1.48 0-2.63-3.93-9.4-12.3-9.4-8.37 0-12.3 6.77-12.3 9.4 0 .84.46 1.48 1.38 1.48Z"/></svg>
        </TaskInfoLane>

        <TaskInfoLane :name="'Type'" :textButton="'Change type'" :value="props.type">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13M5 5v3m14-3v3m0-3H5m10 15H9"/>
            </svg>    
        </TaskInfoLane>

        <TaskInfoLane :name="'Date'" :textButton="'Change Date'" :value="props.date">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 24 24">
                <path stroke="#b3b3b3" stroke-linecap="round" stroke-width="2" d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3m16 0v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9m16 0H4m4-7v4m8-4v4"/>
                <rect width="3" height="3" x="6" y="12" fill="#b3b3b3" rx=".5"/>
                <rect width="3" height="3" x="10.5" y="12" fill="#b3b3b3" rx=".5"/>
                <rect width="3" height="3" x="15" y="12" fill="#b3b3b3" rx=".5"/>
            </svg>            
        </TaskInfoLane>

        <TaskInfoLane :name="'Time-limit'" :textButton="'Estimate'" :value="props.timeLimit" @setValue="(arg) => openOrCloseForm(arg, true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <g fill="#b3b3b3">
                    <path d="M23 12c0 .35-.02.7-.05 1.05a7.01 7.01 0 0 0-1.96-1.38 9 9 0 1 0-9.32 9.32c.34.73.81 1.4 1.38 1.96A11 11 0 1 1 23 12Z"/>
                    <path d="m13 11.88.84.49c-.56.41-1.05.9-1.46 1.46l-.86-.5a1 1 0 0 1-.4-.4c-.12-.2-.12-.46-.12-.46V6a1 1 0 1 1 2 0v5.88Zm2.3 5.82a1 1 0 0 1 1.4 0l.65.65 1.9-1.9a1 1 0 0 1 1.41 1.41l-2.54 2.54a1 1 0 0 1-.29.2 1 1 0 0 1-1.21-.15l-1.33-1.33a1 1 0 0 1 0-1.41Z"/>
                    <path fill-rule="evenodd" d="M18 24a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-1.98a4.02 4.02 0 1 1 0-8.04 4.02 4.02 0 0 1 0 8.04Z" clip-rule="evenodd"/>
                </g>
            </svg>              
        </TaskInfoLane>
        <EstimateWindow />           

        <TaskInfoLane :name="'Priority'" :textButton="'Change priority'" :value="props.priority">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 512 512">
                <g fill="var(--ci-primary-color, #b3b3b3)">
                <path d="M256 416h240v32H256zm0-106.67h240v32H256zm0-106.66h240v32H256zM328 96h168v32H328z" class="ci-primary"/>
                <path d="M302 111 167.2 27.22V96h-5.96c-39.46 0-76.33 18.75-103.84 52.81C30.7 181.87 16 225.61 16 272s14.7 90.13 41.4 123.19C84.91 429.25 121.78 448 161.23 448H216v-32h-54.77C98.8 416 48 351.4 48 272s50.8-144 113.23-144h5.97v69.23ZM199.2 84.78 242 111.4l-42.8 27.38Z" class="ci-primary"/>
                </g>
            </svg>
        </TaskInfoLane>

                <!-- <card_drop v-if="isOpenForms.changePriority">
                    <FormPriority @open-or-close="(arg) => setPriority(arg)" />
                </card_drop> -->
 
        <SubtaskField :date="date" :id="id" />
        <CommentsField :date="date" :id="id" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    margin: 20px 0;
}
</style>