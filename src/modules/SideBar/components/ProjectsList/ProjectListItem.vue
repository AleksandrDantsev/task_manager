<script setup>
import { ref, computed } from 'vue';
import { capitalize } from '../../../../helpers/capitalize';
import { randomColor } from "../../../../helpers/randomColor";
import card_drop from '../../../../hoc/card_drop.vue';
import ProjectListActionsWindow from './ProjectListActionsWindow.vue';
import { useStore } from 'vuex';


const props = defineProps({
    name: String,
    isOpenWindow: Boolean,
    isClosedSideBar: Boolean,
    isActiveProjectName: String,
});

const capitilizedNameProject = capitalize(props.name);
const colorAvatar = randomColor();
const isEditLineOpen = ref(false);
const nameProject = ref(capitilizedNameProject);
const store = useStore();

const openEditLine = () => {
    isEditLineOpen.value = !isEditLineOpen.value;
}

const focusOut = () => {
    if ( isEditLineOpen.value = true)  isEditLineOpen.value = false;
}

const changeNameProjectEnter = () => {
    store.commit("alterNameProject", [capitilizedNameProject, nameProject.value]);
    isEditLineOpen.value = false;
}

const setProjectNameInput = (e) => {
    nameProject.value = capitalize(e.target.value);
}

const isAlreadyCopied = computed(() => props.name.includes("-Copy"))

</script>

<template>
    <div class="project-list-item" @focusout.stop="focusOut"
        :class="{'closed-sidebar-style': isClosedSideBar, 
                 'active-project': isActiveProjectName === name}"
        :data-projectName="capitilizedNameProject">
        <div class="avatar-name-project">
            <div class="avatar-project" :class="{ 'margin-zero': isClosedSideBar }" :style="{ 'background-color': colorAvatar }">
                <div class="name-project">
                    {{ name.slice(0, 1) }}
                </div>
            </div>
            <div v-if="!isClosedSideBar && !isEditLineOpen" class="title">{{ capitilizedNameProject }}</div>
            <div v-else-if="isEditLineOpen" class="input-change-name-project">
                <input :class="{'edit-name-project': isEditLineOpen}" 
                        type="text" 
                        :value="nameProject"
                        @keydown.enter="changeNameProjectEnter"
                        @input="setProjectNameInput"
                        >
            </div>
        </div>
        <div class="project-item-action" v-if="!isClosedSideBar" >
            <button class="icon" :class="`unit-project-${name}`">
                <svg data-v-792b3c77="" data-v-d7e04b56="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="simple" style="height: 22px; width: 22px; fill: #b3b3b3; --94dfce4c: inherit;"><path opacity="0.39" d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#b3b3b3"></path><path d="M5 10C6.1 10 7 10.9 7 12C7 13.1 6.1 14 5 14C3.9 14 3 13.1 3 12C3 10.9 3.9 10 5 10ZM19 10C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14C17.9 14 17 13.1 17 12C17 10.9 17.9 10 19 10Z" fill="#b3b3b3"></path></svg>
            </button>
        </div>
        <div class="drop-action-menu-wrapper" 
            :class="`drop-action-menu-${name}`"
            v-if="isOpenWindow" >
            <card_drop :width="'100%'" :height="'min-height'" :isOpenWindow="isOpenWindow" >
                <ProjectListActionsWindow   :isClosedSideBar="isClosedSideBar" 
                                            :name="name" 
                                            :openEditLine="openEditLine" 
                                            :isAlreadyCopied="isAlreadyCopied"
                                            />
            </card_drop>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.project-list-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    height: 30px;
    width: 100%;
    margin: 8px 0;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #f1f1f1;
    }
    &:hover .icon {
        visibility: visible;
    }
}
.avatar-name-project {
    display: flex;
    pointer-events: none;
}

.avatar-project {
    text-align: center;
    font-size: 12px;
    margin-right: 10px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
}

.name-project {
    color: #fff;
}
.title {
    font-size: 14px;
}

.margin-zero {
    margin: 0;
}

.closed-sidebar-style {
    justify-content: center;
}

.active-project {
    background-color: #ebebeba8;
}
.icon {
    display: flex;
    align-items: center;
    visibility: hidden;
    cursor: pointer;
    svg {
        user-select: none;
        pointer-events: none;
    }
}
.drop-action-menu-wrapper {
    position: absolute;
    width: 99%;
    z-index: 990;
    right: 0;
    top: 35px;
    pointer-events: initial;
}
.input-change-name-project {
    width: 80%;
}
.edit-name-project {
    width: 100%;
    border-radius: 6px;
    font-size: 14px;
    padding: 0 5px;
    pointer-events: initial;
    transition-duration: 1s;
    outline: solid 1px #cccccc;
}
</style>