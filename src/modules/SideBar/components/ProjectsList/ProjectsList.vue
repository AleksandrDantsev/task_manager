<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProjectListItem from './ProjectListItem.vue';
import { useCloseDropWindow } from '../../../../hooks/useCloseDropWindow';

    const props = defineProps({
        isClosedSideBar: Boolean,
    });
    const store = useStore();

    const projects = computed(() => {
        return store.getters.getFoundProjects;
    })

    const isActiveProjectName = computed(() => store.state.projectsStore.currentProject);

    const changeProject = (e) => {
        const elementDataAtr = e.target.getAttribute("data-projectName");
        if (elementDataAtr) {
            store.commit("switchProject", elementDataAtr);
        }
    }

    const classObjectForClosesWindow = computed(() => {
        const obj = {};
        const projects = store.getters.getFoundProjects;
        if (projects.length) {
            for (let project of projects) {
                obj[project] = [false, `unit-project-${project}`, `drop-action-menu-${project}`];
            }
            return obj;
        }
        
        return {};
    });
    console.log(classObjectForClosesWindow.value)
    const isOpenWindow = useCloseDropWindow(classObjectForClosesWindow.value);

</script>

<template>
    <div class="project-list" :class="{'closed-sidebar-nulify': isClosedSideBar}">
        <div v-if="!isClosedSideBar" class="title">Projects</div>
        <div class="list-conteiner" :class="{'closed-sidebar-style': isClosedSideBar}" @click="changeProject">
            <ProjectListItem v-for="(item, i) in projects" 
                            :isClosedSideBar="isClosedSideBar"
                            :key="item + i"
                            :isOpenWindow="isOpenWindow[item]?.[0]"
                            :isActiveProjectName="isActiveProjectName" 
                            :name="item" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .project-list {
        height: 50%;
        padding: 15px 10px;
        width: 90%;
        margin: 0 auto;
    }
    .title {
        font-size: 14px;
        color: #6e6e6e;
    }
    .list-conteiner {
        height: 100%;
        padding-right: 15px;
        overflow-y: auto;
    }
    .closed-sidebar-style {
        padding: 0;
    }
    .closed-sidebar-nulify {
        padding: 0;
        height: 70%;
    }
</style>