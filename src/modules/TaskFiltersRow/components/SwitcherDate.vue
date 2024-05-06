<script setup>
const props = defineProps({
    currentDate: String,
})
</script>

<template>
    <div class="switcher-date">
        <div class="arrow-switch left-arrow" @click="$emit('date-minus')">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#b3b3b3" viewBox="0 -0.5 17 17"><path fill="#b3b3b3" fill-rule="evenodd" d="M6.11 15.5c-.58.58-2.1.9-2.1-1v-13c0-1.83 1.52-1.58 2.1-1l6.45 6.45c.58.58.58 1.52 0 2.1L6.1 15.5Z"/></svg>
        </div>
        <div class="calendar">
            <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3" viewBox="-1 0 32 32"><path fill="#b3b3b3" fill-rule="evenodd" d="M14 24h2v2h-2v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm-8-4h2v2H6v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm8-12h2v2h-2v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm-8-4h2v2H6v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM28 8H2V6a2 2 0 0 1 2-2h4v1a1 1 0 1 0 2 0V4h10v1a1 1 0 1 0 2 0V4h4a2 2 0 0 1 2 2v2Zm0 20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10h26v18ZM26 2h-4V1a1 1 0 1 0-2 0v1H10V1a1 1 0 1 0-2 0v1H4a4 4 0 0 0-4 4v22a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Zm-4 14h2v2h-2v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm0 4h2v2h-2v-2Zm0 4h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"/></svg>
        </div>
        <div class="date">
                {{ props.currentDate }}
        </div>
        <div class="arrow-switch right-arrow" @click="$emit('date-plus')">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#b3b3b3" viewBox="0 -0.5 17 17"><path fill="#b3b3b3" fill-rule="evenodd" d="M6.11 15.5c-.58.58-2.1.9-2.1-1v-13c0-1.83 1.52-1.58 2.1-1l6.45 6.45c.58.58.58 1.52 0 2.1L6.1 15.5Z"/></svg>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .switcher-date {
        display: flex;
        user-select: none;
    }
    .arrow-switch {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5;
        &:hover svg path{
            fill: #0553c9;
        }
        svg path{
            transition-duration: 200ms;
        }
        
    }
    .left-arrow {
        transform: rotate(-180deg);
    }
    .calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
    }
    .date {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        min-width: 160px;
        text-align: center;
        color: #b3b3b3;
        font-size: 16px;
        white-space: nowrap;
    }
</style>
