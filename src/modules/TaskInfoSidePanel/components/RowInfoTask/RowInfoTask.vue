<script setup>
import buttonRegular from '../../../../UI/button-regular.vue';
import card_drop from '../../../../hoc/card_drop.vue';
import FormPriority from '../FormPriority/FormPriority.vue';
import { useStore } from 'vuex';
import { reactive } from 'vue';

const props = defineProps({
        assignees: String | null,
        type: String,
        timeLimit: String | null,
        date: String,
        priority: String | null,
        subtasks: [],
        comments: [],
})

const store = useStore();

const isOpenForms = reactive({
    changePriority: false,
})

const openOrCloseForm = (field, state) => {
    isOpenForms[field] = state; 
}

const setPriority = (priorityOpted) => {
    if (priorityOpted) {
        const currentTaskData = store.state.currentInfoEl;
        store.commit("changePriority", [currentTaskData['date'], priorityOpted, currentTaskData['id']]);
        openOrCloseForm("changePriority", false);
    } 
}

</script>

<template>
    <div class="wrapper">
        <div class="row">
            <div class="view-info">
                <div class="icon"></div>
                <div class="name"><h5>Assignees</h5></div>
            </div>
            <div class="actions-info">
                <buttonRegular v-if="!props.assignees" text="Change assignees"/>
                {{ props.assignees }}
            </div>
        </div>
        <div class="row">
            <div class="view-info">
                <div class="icon"></div>
                <div class="name"><h5>Type</h5></div>
            </div>
            <div class="actions-info">
                <buttonRegular v-if="props.type" :text="props.type" :style="'unvisible'" /> 
                <buttonRegular v-else :text="props.type" /> 
            </div>
        </div>
        <div class="row">
            <div class="view-info">
                <div class="icon"></div>
                <div class="name"><h5>Date</h5></div>
            </div>
            <div class="actions-info">
                <buttonRegular :text="props.date" :style="'unvisible'" /> 
            </div>
        </div>
        <div class="row">
            <div class="view-info">
                <div class="icon"></div>
                <div class="name"><h5>Time-limit</h5></div>
            </div>
            <div v-if="props.timeLimit" class="actions-info">
                <buttonRegular :text="props.timeLimit" /> 
            </div>
            <buttonRegular v-else :text="'Estimate...'" /> 
        </div>
        <div class="row">
            <div class="view-info">
                <div class="icon"></div>
                <div class="name"><h5>Priority</h5></div>
            </div>
            <div class="actions-info priority" @click="() => openOrCloseForm('changePriority', true)" 
                :class="props.priority && `pr-${props.priority}`">
                {{ props.priority }}
                <buttonRegular v-if="!props.priority" text="Change priority"/>
                <card_drop v-if="isOpenForms.changePriority">
                    <FormPriority @open-or-close="(arg) => setPriority(arg)" />
                </card_drop>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.wrapper {
    margin: 20px 0;
}
.row {
    display: flex;
    width: 100%;
    padding: 10px 0;
}
.name {
    width: 200px;
    margin: 0 auto;
    h5 {
        font-size: 17px;
        color: #888686;
    }
}

.actions-info {
    min-width: 40px;
    text-align: center;
    padding: 3px 2px;
    border-radius: 5px;
    font-size: 16px;
}
.priority {
    position: relative;
    color: #fff;
    cursor: pointer;
}
.pr-low {
    background-color: #54be54b6;
}
.pr-middle {
    background-color: #fac002b7;
}
.pr-high {
    background-color: #da0404da;
}
</style>