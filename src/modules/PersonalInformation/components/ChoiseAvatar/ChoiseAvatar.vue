<script setup>
import { ref } from 'vue';
import { avatars, banners } from "./avatars";
import Avatar from "../Avatar/Avatar.vue";
import buttonSendRed from '../../../../UI/button-send-red.vue';
import { useStore } from "vuex";

const props = defineProps({
    dataInfoUser: Object,
})

const store = useStore();
const activeTab = ref("avatar");
const choisenImageOrColor = ref("");
const colors = ["#ff607c", "#fc0352", "#a1d8e6", "#9de096", "#e1e3da", "#db523d", "#bd9ed9"];

const alterTab = (e) => {
    const referenceTabs = {
        "tab-avatar": "avatar",
        "tab-banner": "banner",
    }
    const target = e.target;
    if (target.id) activeTab.value = referenceTabs[target.id];
}

const setAvatarOrBannerColor = (e) => {
    const target = e.target;
    if (target.getAttribute("data-set-avatar")) {
        if (activeTab.value === "avatar") {
            choisenImageOrColor.value = target.getAttribute("data-set-avatar");
        }
        else if (activeTab.value === "banner") {
            store.commit("setValueUserInfo", ["bannerImage", target.getAttribute("data-set-avatar")]);
        }
    }
}

const setBanner = (e) => {
    const target = e.target;
    if (target.getAttribute("data-set-banner")) {
        const currentElementClicked = target.getAttribute("data-set-banner");
        store.commit("setValueUserInfo", ["bannerImage", currentElementClicked]);
    }
}

const applyAvatar = () => {
    if (choisenImageOrColor.value) {
        store.commit("setValueUserInfo", ["avatarImage", choisenImageOrColor.value]);
    }
}

const resetAvatar = () => {
    store.commit("setValueUserInfo", ["avatarImage", '']);
}

</script>

<template>
    <div class="choise-avatar-conteiner">
        <div class="tabs" @click.stop="alterTab">
            <button class="tab-unit tabs-avatar" :class="{'active': activeTab === 'avatar'}" id="tab-avatar">Avatar</button>
            <button class="tab-unit tabs-banner" :class="{'active': activeTab === 'banner'}" id="tab-banner">Banner</button>
        </div>
        <div class="images-container">
            <div v-if="activeTab === 'avatar'" class="preview-block" >
                <div class="preview-conteiner">
                    <div class="avatar-conteiner">
                        <Avatar :choisenImageOrColor="choisenImageOrColor"/>
                    </div>
                    <div class="buttons-action">
                        <div class="bt-action button-action-save">
                            <buttonSendRed :text="'Save'" @click="applyAvatar"/>
                        </div>
                        <div class="bt-action button-action-reset">
                            <buttonSendRed :text="'Reset'" @click="resetAvatar" :color="'#d4d2d2'"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="choise-image-color" :class="{'full-width': activeTab === 'banner'}">
                <div class="choise-image-wrapper">
                    <div class="colors">
                        <h4 class="title">Colors</h4>
                        <div class="colors-wrapper" @click="setAvatarOrBannerColor">
                            <div class="color-unit" v-for="color in colors"
                                                    :key="color"
                                                    :style="{'background-color': color}"
                                                    :data-set-avatar="color"                            
                            ></div>
                        </div>
                    </div>
                    <div class="images" v-if="activeTab === 'avatar'">
                        <h4 class="title">Avatars</h4>
                        <div class="images-wrapper" @click="setAvatarOrBannerColor">
                            <div class="image-unit" v-for="(avatar, i) in avatars"
                                                    :key="avatar + i">
                                <img :src="avatar" alt="avatar" :data-set-avatar="avatar">
                            </div>
                        </div>
                    </div>
                    <div v-else class="banners">
                        <h4 class="title">Banners</h4>
                        <div class="images-wrapper" @click="setBanner">
                            <div class="banner-unit" v-for="(banner, i) in banners"
                                                    :key="banner + i">
                                <img :src="banner" alt="banner" :data-set-banner="banner">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    $bor-rad5: 5px;

    .choise-avatar-conteiner {
        padding: 15px 25px;
        height: 100%;
    }
    .tabs {
        display: flex;
        border-bottom: solid 1px #e6e6e6;
    }
    .tab-unit {
        width: 120px;
        height: 35px;
        font-size: 15px;
        color: #474747;
        font-weight: 600;
        cursor: pointer;
        transition-duration: 300ms;
        border-bottom: solid 2px transparent;
    }
    .avatar-conteiner {
        height: 120px;
        width: 100%;
    }
    .tabs-avatar {

    }
    .tabs-banner {

    }
    .images-container {
        display: flex;
        margin: 20px 0;
        height: calc(100% - 45px);
    }
    .preview-block {

        width: 30%;
        margin-right: 5%;
    }
    .preview-conteiner {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .avatar-set-info {
        
    }
    .buttons-action {
        width: 100%;
    }
    .bt-action {
        height: 35px;
        width: 100%;
        margin: 12px 0;
    }
    .colors-wrapper {
        display: flex;
    }
    .color-unit {
        width: 25px;
        height: 25px;
        cursor: pointer;
        border-radius: $bor-rad5;
        box-shadow: 0 0 5px 0 #f1f1f186;      
        margin: 0 5px;
    }
   
    .button-action-save {
        
    }
    .button-action-reset {
        
    }
    .choise-image-color {
        width: 65%;
        height: 100%;
        overflow-y: auto;
    }
    .choise-image-wrapper {
        height: 100%;
    }
    .colors {
        margin-bottom: 20px;
    }
    .title {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 18px;
        color: #575757;
    }
    .images {
        
    }
    .images-wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .image-unit {
        width: calc(100% / 3 - 10px);
        margin: 5px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: $bor-rad5;
        }
    }
    .active {
        border-color: #c40f0f;
        color: #c40f0f;
    }
    .full-width {
        width: 100%;
    }
    .banner-unit {
        width: 100%;
        height: 120px;
        margin: 10px 0;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: $bor-rad5;
        }
    }
</style>