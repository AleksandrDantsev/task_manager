<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

    const store = useStore();
    const searchProjectName = ref('');

    const setSearchName = (e) => {
        searchProjectName.value = e.target.value;
        store.commit("setStringSearch", searchProjectName.value);
    }

    const deleteSearchString = () => {
        searchProjectName.value = '';
        store.commit("setStringSearch", searchProjectName.value);
    }

</script>

<template>
    <div class="search-project">
        <input class="search-project-input"
                @input="setSearchName"
                placeholder="Project"
                :value="searchProjectName"
        />
        <div class="icon-delete-search-string" 
            :class="{'show-cross-del': searchProjectName}"
            @click="deleteSearchString">
            <svg data-v-2e170f8e="" data-v-792b3c77="" data-v-d7e04b56="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 20px; width: 20px; fill: rgb(179, 179, 179);"><path data-v-2e170f8e="" opacity="0.39" d="M14.8 13.4L18.7 17.3C19.1 17.7 19.1 18.3 18.7 18.7C18.3 19.1 17.7 19.1 17.3 18.7L13.4 14.8C13 14.4 13 13.8 13.4 13.4C13.8 13 14.4 13 14.8 13.4Z" fill="##b3b3b3"></path><path data-v-2e170f8e="" d="M6.70002 18.7C6.30002 19.1 5.7 19.1 5.3 18.7C4.9 18.3 4.9 17.7 5.3 17.3L10.6 12L5.3 6.70002C4.9 6.30002 4.9 5.7 5.3 5.3C5.7 4.9 6.30002 4.9 6.70002 5.3L12 10.6L17.3 5.3C17.7 4.9 18.3 4.9 18.7 5.3C19.1 5.7 19.1 6.30002 18.7 6.70002L6.70002 18.7Z" fill="##b3b3b3"></path></svg>
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    .search-project {
        position: relative;
        width: 90%;
        margin: 20px auto;
        margin-bottom: 0;
    }
    .search-project-input {
        height: 40px;
        width: 100%;
        padding: 0 15px;
        border-radius: 6px;
        transition-duration: 400ms;
        background-color: #f5f5f5;
        &:hover {
            background-color: #ebebebd5;
        }
    }
    .icon-delete-search-string {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        right: 10px;
        top: 50%;
        z-index: 20;
        cursor: pointer;
        transform: translate3d(0, -40%, 0);
        svg {
            pointer-events: none;
        }
    }
    .show-cross-del {
        animation: show-cross-del-anim 500ms ease forwards ;
    }

    @keyframes show-cross-del-anim {
        0% {
            opacity: 0;
            visibility: hidden;
        }
        100%{
            opacity: 1;
            visibility: unset;
        }
    }
</style>
