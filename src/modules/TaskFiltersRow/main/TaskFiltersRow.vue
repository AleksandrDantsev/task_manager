<script setup>
import SwitcherDate from '../components/SwitcherDate.vue';
import FilterByField from "../components/FilterByField/FilterByField.vue";

const props = defineProps({
    changeShiftDate: Function,
    currentDate: String,
})

</script>

<template>
    <div class="filters">
        <div class="wrapper">
            <FilterByField />
            <SwitcherDate @date-minus="props.changeShiftDate(true)"
                          @date-plus="props.changeShiftDate(false)"
                          :currentDate="props.currentDate"
                />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .filters {
        position: relative;
        z-index: 777;
        height: 40px;
        width: 100%;
        min-height: 40px;
        padding: 0 18px;
        margin-bottom: 15px;
    }
    .wrapper {
        position: fixed;
        height: 40px;
        display: flex;
        width: min-content;
    }
</style>
