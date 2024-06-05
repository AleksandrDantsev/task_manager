<script setup>
    const props = defineProps({
        name: String,
    });
</script>

<template>
    <li :id="`pr-action-${name}`" @click="$emit('click-pr-action', $event)">
        <div class="icon">
            <slot></slot>
        </div>
        <div class="title">{{ name }}</div>
    </li>
</template>

<style lang="scss" scoped>
    .icon {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }
    .title {
        color: #575757;
        font-size: 14px;
        user-select: none;
        pointer-events: none;
    }
</style>