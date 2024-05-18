<script setup>
const props = defineProps({
    text: String | Number,
    style: String,
})
</script>

<template>

    <button :class="{
            'classic-button': props.style === 'classic',
            'unvisible-button': props.style === 'unvisible',
            'button': Boolean(props.style) === false,
        }">
        <slot></slot>
        {{ props.text }}
    </button>
</template>

<style scoped lang="scss">
    @mixin styleButton {
        position: relative;
        height: 23px;
        padding: 3px 15px;
        border-radius: 3px;
        font-size: 13px;
        font-weight: 600;
        overflow: hidden;
        transition-duration: 200ms;
        color: #575757;
        background-color: #f5f5f5d8;
        box-shadow: 0 0 4px 0 #d4d4d4d8;
        cursor: pointer;
        &:hover {
            background-color: #f3f3f3ab;
        }
    }
    .unvisible-button {
        @include styleButton;
        background-color: unset;
    }
    .classic-button {
        @include styleButton;
    }
    .button {
        @include styleButton;
        &::before {
            content: '';
            position: absolute;
            right: 150px;
            top: -10px;
            height: 65px;
            width: 18px;
            transform: rotate(35deg);
            background-color: #ffffff;
        }
        &:hover::before {
            animation: flash 500ms ease forwards;
        }
    }

    @keyframes flash {
        to {
            right: -50px;
            background-color: #fff;
            box-shadow: 0 0 10px 0 #fff;
        }
    }
</style>