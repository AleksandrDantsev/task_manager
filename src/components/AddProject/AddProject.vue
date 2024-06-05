<script setup>
    import card_drop from "../../hoc/card_drop.vue";
    import { useCloseDropWindow } from "../../hooks/useCloseDropWindow";
    import AddProjectWindow from "../AddProjectWindow/AddProjectWindow.vue";


    const [isOpenWindow] = useCloseDropWindow(false, "button-conteiner-add-project", 'drop-conteiner-project');


</script>

<template>
    <div class="button-conteiner-add-project">
        <div class="drop-conteiner-project">
            <card_drop :isOpenWindow="isOpenWindow" :width="'400px'" :height="'220px'" >
                <AddProjectWindow />
            </card_drop>
        </div>
        <button class="add-project-button">
            <span class="svg-icon">
                <svg data-v-55f6bb32="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="v-icon v-icon_original" style="width: 24px !important; height: 24px !important; min-width: 24px !important;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2H11.9632H11.9631C10.5965 2 9.51986 1.99999 8.64899 2.05941C7.76134 2.11997 7.01469 2.2456 6.32122 2.53284C4.60602 3.2433 3.2433 4.60602 2.53284 6.32122C2.2456 7.01469 2.11997 7.76134 2.05941 8.64899C1.99999 9.51986 2 10.5965 2 11.9631V11.9632V12V12.0368V12.0369C2 13.4035 1.99999 14.4801 2.05941 15.351C2.11997 16.2387 2.2456 16.9853 2.53284 17.6788C3.2433 19.394 4.60602 20.7567 6.32122 21.4672C7.01469 21.7544 7.76134 21.88 8.64899 21.9406C9.51986 22 10.5965 22 11.9631 22H12H12.0369C13.4035 22 14.4801 22 15.351 21.9406C16.2387 21.88 16.9853 21.7544 17.6788 21.4672C19.394 20.7567 20.7567 19.394 21.4672 17.6788C21.7544 16.9853 21.88 16.2387 21.9406 15.351C22 14.4801 22 13.4035 22 12.0369V12V11.9631C22 10.5965 22 9.51986 21.9406 8.64899C21.88 7.76134 21.7544 7.01469 21.4672 6.32122C20.7567 4.60602 19.394 3.2433 17.6788 2.53284C16.9853 2.2456 16.2387 2.11997 15.351 2.05941C14.4801 1.99999 13.4035 2 12.0369 2H12.0368H12ZM7.08658 4.3806C7.49574 4.21112 7.99931 4.10839 8.78514 4.05477C9.57994 4.00054 10.5885 4 12 4C13.4115 4 14.4201 4.00054 15.2149 4.05477C16.0007 4.10839 16.5043 4.21112 16.9134 4.3806C18.1386 4.88807 19.1119 5.86144 19.6194 7.08658C19.7889 7.49574 19.8916 7.99931 19.9452 8.78514C19.9995 9.57994 20 10.5885 20 12C20 13.4115 19.9995 14.4201 19.9452 15.2149C19.8916 16.0007 19.7889 16.5043 19.6194 16.9134C19.1119 18.1386 18.1386 19.1119 16.9134 19.6194C16.5043 19.7889 16.0007 19.8916 15.2149 19.9452C14.4201 19.9995 13.4115 20 12 20C10.5885 20 9.57994 19.9995 8.78514 19.9452C7.99931 19.8916 7.49574 19.7889 7.08658 19.6194C5.86144 19.1119 4.88807 18.1386 4.3806 16.9134C4.21112 16.5043 4.10839 16.0007 4.05477 15.2149C4.00054 14.4201 4 13.4115 4 12C4 10.5885 4.00054 9.57994 4.05477 8.78514C4.10839 7.99931 4.21112 7.49574 4.3806 7.08658C4.88807 5.86144 5.86144 4.88807 7.08658 4.3806ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L10 13.5858L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L9.29289 15.7071C9.68342 16.0976 10.3166 16.0976 10.7071 15.7071L16.7071 9.70711Z" fill="#6788F3"></path></svg>
            </span>
            <span class="title">
                Add Project
            </span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .button-conteiner-add-project {
        position: relative;
        display: flex;
        align-items: center;
        width: 130px;
        height: 100%;
    }
    .add-project-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 65%;
        white-space: nowrap;
        background-color: #f3f3f3;
        border-radius: 6px;
        transition-duration: 500ms;
        box-shadow: 0 0 5px 0 #e9e9e975;
        cursor: pointer;
        &:hover {
            background-color: #e6e6e6;
        }
    }
    .svg-icon {
        display: flex;
        align-items: center;
    }
    .title {
        margin-left: 6px;
        font-weight: 600;
        color: #5f5f5f;
        font-size: 15px;
    }
    .drop-conteiner-project {
        position: absolute;
        z-index: 999;
        top: 60px;
    }
</style>