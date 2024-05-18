<script setup>
    const props = defineProps({
        name: String,
        isClosedSideBar: Boolean,
        link: String,
    });
</script>

<template>
    <RouterLink :to="link" activeClass="active-link">
        <div class="link-menu" :class="{'center-icon': isClosedSideBar}">
                <slot></slot>
            <div v-if="!isClosedSideBar" class="name">{{ name }}</div>
        </div>
    </RouterLink>    
</template>

<style lang="scss" scoped>
    .link-menu {
        display: flex;
        width: 80%;
        margin: 0 auto;
    }
    .center-icon {
        justify-content: center;
    }
    a {
        display: block;
        padding: 8px 0;
        border-radius: 6px;
        width: 100%;
    }
    .name {
        margin-left: 10px;
        font-size: 15px;
    }
    .active-link {
        background-color: #ebebeb8a;
    }
</style>