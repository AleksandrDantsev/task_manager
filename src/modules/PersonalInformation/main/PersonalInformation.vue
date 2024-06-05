<script setup>
import HeadInfo from "../components/HeadInfo/HeadInfo.vue";
import BodyInfo from "../components/BodyInfo/BodyInfo.vue";
import buttonSendRed from "../../../UI/button-send-red.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const isSavedInfo = ref(false);

const saveInfoUser = (e) => {
    if (e.target.id === 'save-info') {
        store.commit("setInfoUserOnClick");
        isSavedInfo.value = true;
    }
}

const isChangedValues = computed(() => {
    const precursorObject = store.state.infoUser.infoUserState;
    const descendantObject = store.state.infoUser.mockInfoUser;
    console.log( JSON.stringify(precursorObject) !== JSON.stringify(descendantObject))
    return JSON.stringify(precursorObject) !== JSON.stringify(descendantObject);
})

const infoUser = computed(() => store.state.infoUser.infoUserState);

</script>

<template>
    <div class="conteiner-person-info">
        <div class="internal-wrapper">
            <HeadInfo :infoUser="infoUser" />
            <BodyInfo :infoUser="infoUser" />
            <div class="apply-info">
                <div class="apply-info-bt-wrapper">
                    <div class="apply-info-bt" :class="{'allowToSave': isChangedValues}">
                        <buttonSendRed @click="(event) => saveInfoUser(event)" 
                                      :text="Boolean(isSavedInfo) ? 'Saved' : 'Save'" 
                                      id="save-info"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .conteiner-person-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: 90%;
        background-color: #f5f5f5d8;
    }
    .internal-wrapper {
        width: 85%;
        height: auto;
        height: 90vh;
        margin-left: 35px;
        border-radius: 12px;
        overflow-y: auto;
        
    }
    .conteiner-person-info ::-webkit-scrollbar { width: 0; };
    .apply-info {
        padding: 25px 0;
        border-radius: 12px;
        background-color: #fff;
    }
    .apply-info-bt-wrapper {
        display: flex;
        justify-content: end;
        width: 90%;
        height: 100%;
        margin: 0 auto;
    }
    .apply-info-bt {
        width: 150px;
        height: 40px;
        opacity: .5;
        transition-duration: 400ms;
        pointer-events: none;
    }
    .allowToSave {
        opacity: 1;
        pointer-events: initial;
    }
</style>