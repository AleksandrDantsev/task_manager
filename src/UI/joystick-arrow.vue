<script setup>
const props = defineProps({
    classname: String,
})
</script>

<template>
    <div :class="props.classname">
        <svg fill="#d4d4d4d8" width="30" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3 12 3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z"/></svg>
    </div>
</template>

<style scoped lang="scss">
        @mixin rotate($degree) {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 21px;
        transform: rotate($degree);
        cursor: pointer;
        &:hover {
            svg {
                fill: #e40000;
            }
        }
    }
    .left_move {
        @include rotate(0);
    }
    .top_move {
        @include rotate(90deg);
    }
    .bottom_move {
        @include rotate(270deg);
    }
    .right_move {
        @include rotate(180deg);
    }
</style>