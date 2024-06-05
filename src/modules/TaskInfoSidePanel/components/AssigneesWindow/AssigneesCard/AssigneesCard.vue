<script setup>
    import Avatar from '../../../../PersonalInformation/components/Avatar/Avatar.vue';

    const props = defineProps({
        name: String,
        avatar: String,
    });
    
</script>

<template>
    <div class="assignees-card">
        <div class="avatar-wrapper">
            <div class="avatar">
                <Avatar :choisenImageOrColor="avatar"/>
            </div>
        </div>
        <div class="name-assignees">
            {{ name }}
        </div>
        <div class="isassigneed"></div>
    </div>
</template>

<style lang="scss" scoped>
    .assignees-card {
        display: flex;
        align-items: center;
        height: 20px;
        width: 100%;
        padding: 0 15px;
        margin: 10px 0;
        cursor: pointer;
    }
    .avatar-wrapper {
        margin-right: 15px;
    }
    .avatar {
        height: 20px;
        width: 20px;
        line-height: 20px;
        border-radius: 20%;
        overflow: hidden;
        font-size: 9px;
        text-transform: capitalize;
        color: #8d8d8d;
        background-color: #f7f7f7be;
    }
    .name-assignees {
        text-align-last: left;
        flex-grow: 1;
        font-size: 15px;
    }
    .isassigneed {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #54be54b6;
    }
</style>