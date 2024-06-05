<script setup>
import { reactive } from 'vue';
import { useStore } from "vuex";
import { validateTimeEstimation } from "../../../../helpers/validateTimeEstimation";

const timeInputsValue = reactive({
    hours: '',
    minutes: '', 
})

const store = useStore();

const setTimeInput = (event, field) => {
    const value = event.target.value;

    timeInputsValue[field] = value;
    timeInputsValue[field] = validateTimeEstimation(timeInputsValue[field], field);
}

const setTimeLimitWithButton = () => {
    const task = store.state.infoTask.currentInfoEl;

    const save = (time={h: timeInputsValue.hours, m: timeInputsValue.minutes}) => {
        const nameProject = store.state.projectsStore.currentProject;
        store.commit("changeValueTask", [
            task.date,
            time,
            task.id,
            "timeLimit",
            nameProject,
        ])
    }

    if (timeInputsValue.hours && timeInputsValue.minutes) save();
    else if (!timeInputsValue.hours && !timeInputsValue.minutes) save(null);
    else if (!timeInputsValue.hours || !timeInputsValue.minutes) {
        timeInputsValue.hours == false ? timeInputsValue.hours = 0 : timeInputsValue.minutes = 0;
        save();
    }
}

</script>

<template>
    <div class="estimate-conteiner">
        <div class="estimate-inner-wrapper">
            <div class="conteiner hours">
                <div class="title">Hours</div>
                <input type="text" 
                placeholder="0" 
                maxlength="3" 
                @input="setTimeInput($event, 'hours')"
                :value="timeInputsValue.hours"
                >
            </div>
            <div class="conteiner minutes">
                <div class="title">Minutes</div>
                <input type="text" 
                placeholder="0" 
                maxlength="2" 
                @input="setTimeInput($event, 'minutes')"
                :value="timeInputsValue.minutes"
                >
            </div>
        </div>
        <div class="button-set-estimate-wrapper">
            <button class="button-set-estimate" @click="setTimeLimitWithButton">Estimate</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.estimate-conteiner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.estimate-inner-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
}

.title {
    font-size: 14px;
    color: #7c7c7c;
    font-weight: 600;
    text-align: start;
    margin-bottom: 10px;
}

.conteiner {
    width: 40%;

    input {
        width: 100%;
        height: 35px;
        border-radius: 6px;
        padding: 0 15px;
        color: #5e5e5e;
        background-color: #ececec;
    }
}
.button-set-estimate-wrapper {
    height: 35px;
    width: 100%;
    margin-top: 15px;
}
.button-set-estimate {
    width: 80%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 400ms;
    background-color: #e70505ef;
    color: #fff;
    &:hover {
        background-color: #e70505cc;
    }
}
</style>
