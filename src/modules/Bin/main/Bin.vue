<script setup>
import card_drop from "../../../hoc/card_drop.vue";
import { useCloseDropWindow } from "../../../hooks/useCloseDropWindow";
import ListBinTasks from "../components/ListBinTasks.vue";

const [isOpenWindow] = useCloseDropWindow(false, "bin-button-toggle", "bin-wrapper", "close-bin");

</script>

<template>
    <div class="bin">
        <button class="bin-button-toggle">
            <svg data-v-792b3c77="" data-v-d7e04b56="" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="simple" style="height: 24px; width: 24px; fill: #cf1818; --94dfce4c: inherit;"><path d="M7 2.59998C7 2.29998 7.30001 2 7.60001 2H16.4C16.7 2 17 2.29998 17 2.59998C17 2.79998 17.2 3 17.4 3H19C19.6 3 20 3.4 20 4C20 4.6 19.6 5 19 5H5C4.4 5 4 4.6 4 4C4 3.4 4.4 3 5 3H6.60001C6.80001 3 7 2.79998 7 2.59998Z" fill="#cf1818"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5681 6C7.57872 6 7.58936 6 7.6 6L16.4319 6C16.6843 5.99997 16.9301 5.99994 17.1382 6.01695C17.3668 6.03562 17.6366 6.07969 17.908 6.21799C18.2843 6.40973 18.5903 6.71569 18.782 7.09202C18.9203 7.36344 18.9644 7.63318 18.9831 7.86177C19.0001 8.06993 19 8.31573 19 8.56812L19 16.2413C19 17.0463 19 17.7106 18.9558 18.2518C18.9099 18.8139 18.8113 19.3306 18.564 19.816C18.1805 20.5686 17.5686 21.1805 16.816 21.564C16.3306 21.8113 15.8139 21.9099 15.2518 21.9558C14.7106 22 14.0463 22 13.2413 22H10.7587C9.95374 22 9.28937 22 8.74817 21.9558C8.18608 21.9099 7.66937 21.8113 7.18404 21.564C6.43139 21.1805 5.81947 20.5686 5.43597 19.816C5.18868 19.3306 5.09012 18.8139 5.04419 18.2518C4.99998 17.7106 4.99999 17.0463 5 16.2413L5 8.6C5 8.58936 5 8.57872 5 8.5681C4.99997 8.31572 4.99994 8.06993 5.01695 7.86177C5.03562 7.63318 5.07969 7.36344 5.21799 7.09202C5.40973 6.71569 5.71569 6.40973 6.09202 6.21799C6.36344 6.07969 6.63318 6.03562 6.86177 6.01695C7.06993 5.99994 7.31572 5.99997 7.5681 6ZM7 8.6V16.2C7 17.0566 7.00078 17.6389 7.03755 18.089C7.07337 18.5274 7.1383 18.7516 7.21799 18.908C7.40973 19.2843 7.71569 19.5903 8.09202 19.782C8.24842 19.8617 8.47262 19.9266 8.91104 19.9624C9.36113 19.9992 9.94342 20 10.8 20H13.2C14.0566 20 14.6389 19.9992 15.089 19.9624C15.5274 19.9266 15.7516 19.8617 15.908 19.782C16.2843 19.5903 16.5903 19.2843 16.782 18.908C16.8617 18.7516 16.9266 18.5274 16.9624 18.089C16.9992 17.6389 17 17.0566 17 16.2V8.6C17 8.00047 17.0135 8 16.4 8H7.6C6.98666 8 7 8.00117 7 8.6Z" fill="#cf1818"></path></svg>
        </button>
        <div class="bin-wrapper">
            <card_drop :width="'300px'"
                       :height="'400px'"
                       :isOpenWindow="isOpenWindow"
            >
                <ListBinTasks />
            </card_drop>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $widthAndHeightBinSign: 40px;

    .bin {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 860;
        right: 25px;
        top: 70px;
        width: $widthAndHeightBinSign;
        height: $widthAndHeightBinSign;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 #d4d4d4d8;
        cursor: pointer;
        background-color: #fff;
    }
    .bin-button-toggle {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .bin-wrapper {
        position: absolute;
        right: 0;
        top: calc($widthAndHeightBinSign + 5px);
    }
</style>