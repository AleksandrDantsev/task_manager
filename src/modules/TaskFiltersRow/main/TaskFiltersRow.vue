<script setup>
import SwitcherDate from '../components/SwitcherDate.vue';

const props = defineProps({
    changeShiftDate: Function,
    currentDate: String,
})

</script>

<template>
    <div class="filters">
        <div class="wrapper">
            <SwitcherDate @date-minus="props.changeShiftDate(true)"
                          @date-plus="props.changeShiftDate(false)"
                          :currentDate="props.currentDate"
                />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .filters {
        display: flex;
        justify-content: end;
        width: 100%;
        min-height: 40px;
        padding: 0 18px;
    }
    .wrapper {
        position: sticky;
        left: 0;
        width: 100vw;
    }
</style>
