<script setup>
import card_drop from '../../../../hoc/card_drop.vue';
import ChoiseAvatar from '../ChoiseAvatar/ChoiseAvatar.vue';
import { useCloseDropWindow } from '../../../../hooks/useCloseDropWindow';
import { useStore } from "vuex";
import { computed } from 'vue';
import Avatar from '../Avatar/Avatar.vue';

const store = useStore();

const props = defineProps({
    infoUser: Object,
});

const [isOpenWindow] = useCloseDropWindow(false, "avatar-conteiner", "choise-avatar-conteiner");
const dataInfoUser = computed(() => store.state.infoUser.infoUserState);

</script>

<template>
    <div class="wrapper-info">
        <div class="banner">
            <div v-if="dataInfoUser['bannerImage'].startsWith('#')" class="background-banner"
                :style="{ 'background-color': dataInfoUser['bannerImage'] }"></div>
            <img v-else :src="dataInfoUser['bannerImage']
                || 'https://storage.weeek.net/images/9a/a8/9aa80833-e8d6-48e1-aee0-10d4ca9965d7/original.png'" alt="">
        </div>
        <header class="header-info-settings">
            <div class="main-info">
                <div class="avatar-conteiner">
                    <Avatar :choisenImageOrColor="dataInfoUser['avatarImage']" :fontSize="'4rem'" />
                    <div class="set-avatar-wrapper">
                        <card_drop :isOpenWindow="isOpenWindow" :width="'500px'" :height="'370px'">
                            <ChoiseAvatar :dataInfoUser="dataInfoUser" />
                        </card_drop>
                    </div>
                </div>
                <div class="name-set-info">{{ `${infoUser.firstName} ${infoUser.lastName}` || '' }}</div>
                <div class="email-set-info">
                    <div v-if="infoUser.email" class="icon-email">
                        <svg data-v-69013cdb="" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" class="v-icon-colored__svg"
                            style="fill: #acacac; height: 20px; width: 20px;">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C12.6053 20 13.2012 19.9329 13.7804 19.8014C14.3983 19.661 14.9947 19.4478 15.559 19.1669C16.0535 18.9209 16.6538 19.1222 16.8999 19.6167C17.1459 20.1111 16.9446 20.7114 16.4501 20.9575C15.7438 21.309 14.997 21.576 14.2234 21.7517C13.4991 21.9162 12.7546 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 16.13 18.9759 18.234 16.7152 18.1C15.5092 17.9854 14.3796 17.3237 13.8839 16.2939C13.1536 16.818 12.2784 17.1484 11.3354 17.2175L10.9288 17.2473C8.91227 17.3952 7.15768 15.8803 7.0098 13.8638C6.98765 13.5617 7.00307 13.2581 7.05571 12.9598L7.37843 11.1311C7.80007 8.74179 9.87614 7 12.3023 7H12.4464C13.3265 7 14.1374 7.29598 14.785 7.79381L14.892 7.13022C14.9447 6.80307 15.2527 6.5806 15.5798 6.63333C15.6041 6.63725 15.6282 6.64267 15.6519 6.64956L16 6.7508C16.5695 6.91644 16.9238 7.48341 16.823 8.06792L15.62 15.0442C15.6186 15.0833 15.6203 15.0833 15.62 15.1224C15.62 15.7416 16.124 16.13 16.8844 16.13C17.951 16.13 20 15.0442 20 12ZM12.3023 9C10.8466 9 9.60098 10.0451 9.348 11.4786L9.02528 13.3074C9.00139 13.4427 8.9944 13.5805 9.00445 13.7175C9.07154 14.6325 9.86762 15.3198 10.7825 15.2527L11.1891 15.2229C12.5227 15.1251 13.6306 14.1565 13.9056 12.848L14.2479 11.2195C14.2741 11.095 14.2872 10.9681 14.2872 10.8408C14.2872 9.82416 13.4631 9 12.4464 9H12.3023Z"
                                fill="#acacac"></path>
                        </svg>
                    </div>
                    <div class="email-text">
                        <a href="mailto:someone@example.com">{{ infoUser.email || '' }}</a>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style lang="scss" scoped>
.set-avatar-wrapper {
    position: absolute;
    left: 110%;
    top: 0;
    z-index: 900;
    cursor: default;
}

.wrapper-info {
    width: 100%;
    min-height: 420px;
    border-radius: 12px;
    margin-top: 20px;
    background-color: #fff;
}

.header-info-settings {
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
}

.banner {
    height: calc(400px / 2);
    border-radius: 12px 12px 0 0;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-position: 50% 0;
    }
}

.main-info {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    min-height: calc(400px / 1.9);
}

.avatar-conteiner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -95px;
    height: 150px;
    width: 150px;
    cursor: pointer;
    border-radius: 12px;
    background-color: #f8f8fb;
}

.name-set-info {
    margin: 15px 0;
    font-size: 2.4rem;
    font-weight: 600;
}

.email-set-info {
    display: flex;
    padding: 20px 0;
}

.icon-email {
    margin-right: 5px;
}

.email-text {
    color: #868686;
    font-size: 18px;
}

.background-banner {
    width: 100%;
    height: 100%;
}

.avatar-color {
    position: relative;
    z-index: 900;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.avatar-image {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        pointer-events: none;
    }
}
</style>