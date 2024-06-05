<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

    const store = useStore();

    const props = defineProps({
        choisenImageOrColor: String | null,
        fontSize: String,
    });

    const getInitials = computed(() => {
        const infoUser = store.state.infoUser.infoUserState;
        if (infoUser && infoUser.firstName && infoUser.lastName) {
            return infoUser.firstName.slice(0, 1) + infoUser.lastName.slice(0, 1);
        }
        return '';
    })

</script>

<template>
    <div class="avatar">
        <div class="avatar-set-info">
            <div v-if="choisenImageOrColor.startsWith('#') || !choisenImageOrColor" class="background-avatar" 
                      :style="{'background-color': choisenImageOrColor || '#e8e8e8'}">
                <div class="internal-block" :style="{'font-size': fontSize}">{{ getInitials }}</div>      
            </div>
            <img v-else-if="choisenImageOrColor" :src="choisenImageOrColor" alt="avatar">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .avatar {
        width: 100%;
        height: 100%;
    }
    .avatar-set-info {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .background-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #eeeef0;
    }
    .internal-block {
        color: #fff;
        font-size: 3rem;
    }
</style>