<script setup>
import PersonalInformationBlock from "../PersonalInformationBlock/PersonalInformationBlock.vue";
import ContactsBlock from "../ContactsBlock/ContactsBlock.vue";
import WorkingInformationBlock from "../WorkingInformationBlock/WorkingInformationBlock.vue";
import { computed } from "vue";
import { debounce } from "../../../../helpers/debounce";
import { capitalize } from "../../../../helpers/capitalize";
import { useStore } from "vuex";


    const store = useStore();

    const getInputValue = debounce((e, field) => {
        const value = capitalize(e.target.value);
        if (value) {
            store.commit("changeInfoValue", [field, value]);
        }
    }, 1300)

    const generalInfoAboutUser = computed(() => {
        return store.state.infoUser.infoUserState;
    })
    


</script>

<template>
    <div class="body-info-wrapper">
        <PersonalInformationBlock :getInputValue="getInputValue" :infoAboutUser="generalInfoAboutUser"/> 
        <ContactsBlock :getInputValue="getInputValue" :infoAboutUser="generalInfoAboutUser"/>
        <WorkingInformationBlock :getInputValue="getInputValue" :infoAboutUser="generalInfoAboutUser"/>    
    </div>
</template>

<style lang="scss" scoped>
    .body-info-wrapper {
        margin: 30px 0;
        border-radius: 12px;
        background-color: #fff;
    }
</style>