<script setup>
import NavigationMenu from "../components/NavigationMenu/NavigationMenu.vue";
import IndicatorCompletedTask from "../components/IndicatorCompletedTasks/IndicatorCompletedTasks.vue";
import ProjectsList from "../components/ProjectsList/ProjectsList.vue";
import SearchProject from "../components/SearchProject/SearchProject.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import Avatar from "../../PersonalInformation/components/Avatar/Avatar.vue";

    const props = defineProps({
        isClosedSideBar: Boolean,
    });

    const store = useStore();

    const imageAvatar = computed(() => store.state.infoUser.infoUserState["avatarImage"])

</script>

<template>
    <nav class="side-panel" :class="{'stateBarHide' : isClosedSideBar, 'stateBarShow' : !isClosedSideBar}">
        <div class="top_line">
            <div v-if="!isClosedSideBar" class="avatar">
                <RouterLink to="/personal-info">
                    <Avatar :choisenImageOrColor="imageAvatar" :fontSize="'22px'" />
                </RouterLink>
            </div>
            <div v-if="!isClosedSideBar" class="name">Aleksander</div>
            <div class="close" :class="{'rotate': isClosedSideBar}" @click="$emit('toggle-side-bar')">
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20" height="20" viewBox="0 0 490 490">
                    <path d="m15.8 245 458.4 245V0L15.8 245zm225.44 0 129.99-69.48v138.95L241.24 245z" fill="#e6e6e6"/>
                </svg>
            </div>
        </div>
        <div class="wrapper">
            <NavigationMenu :isClosedSideBar="isClosedSideBar" />
            <SearchProject v-if="!isClosedSideBar" />
            <ProjectsList :isClosedSideBar="isClosedSideBar"/>
            <div v-if="!isClosedSideBar" class="conteiner-indicator">
                <IndicatorCompletedTask />
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
    .side-panel {
        position: relative;
        width: 20%;
        height: auto;
        overflow: hidden;
        border-right: solid 1px #e6e6e6;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 90%;
    }
    .conteiner-indicator {
        width: 100%;
    }
    .avatar {
        line-height: 40px;
        height: 40px;
        width: 40px;
        border-radius: 5px;
        cursor: pointer;
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .name {
        font-size: 18px;
        font-weight: bold;
        color: #4d4d4d;
        text-transform: capitalize;
    }
    .top_line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px #e6e6e6;
        padding: 0 10px;
        height: 60px;
    }
    .stateBarHide {
        animation: shiftAimationBarHide 500ms ease forwards;
    }
    .stateBarShow {
        animation: shiftAimationBarShow 400ms ease forwards;
    }
    .close {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 5px;
        width: 40px;
        svg {
            path {
                transition-duration: 400ms;
                &:hover {
                    fill: #cf181859;
                }
            }
        }
    }
    .rotate {
        transform: rotate(180deg) translateX(-5px);
        animation: opacitySign 500ms ease forwards;
    }

    @keyframes opacitySign {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes shiftAimationBarShow {
        0% {
            opacity: 0;
            width: 60px;
        }
        40% {
            opacity: 0.02;
        }
        100% {
            opacity: 1;
            width: 20%;
        }
    }
    @keyframes shiftAimationBarHide {
        to {
            width: 60px;
            opacity: 1;
        }
    }
</style>


