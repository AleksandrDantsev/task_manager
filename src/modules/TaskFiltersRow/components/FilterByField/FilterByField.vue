<script setup>
import { ref } from "vue";
import card_drop from "../../../../hoc/card_drop.vue";
import filter_card from "../../../../hoc/filter_card.vue";
import { useStore } from "vuex";
import { useCloseDropWindow } from "../../../../hooks/useCloseDropWindow";

    const store = useStore();
    const sortType = ref("By default");
    const [isOpenWindow] = useCloseDropWindow(false, "conteiner-filter-field", "filtered-drop");

    const choiseSortType = (e) => {
        const idTarget = e.target.id;

        if (idTarget) {
            store.commit("setTypeSort", idTarget);
            sortType.value = e.target.textContent;
        }
    }

</script>

<template>
    <div class="conteiner-filter-field">
        <filter_card>
            <div class="wrapper-filter-filed">
                <div class="icon">
                    <svg data-v-792b3c77="" data-v-1e0b9e25="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="simple" is-static="" style="height: 20px; width: 20px; fill: #3a3a3a; --94dfce4c: inherit;"><path opacity="0.39" d="M14.3 17.1001C14.7 16.7001 15.3 16.7001 15.7 17.1001C16.1 17.5001 16.1 18.1 15.7 18.5L13.4 20.8C13.2 21 12.9 21.3 12.4 21.8C12.2 22 11.8 22 11.6 21.8C11.2 21.4 10.8 21 10.6 20.8C10.6 20.8 9.8 20 8.3 18.5C7.9 18.1 7.9 17.5001 8.3 17.1001C8.7 16.7001 9.30002 16.7001 9.70002 17.1001L11 18.3999V14C11 13.4 11.4 13 12 13C12.6 13 13 13.4 13 14V18.3999L14.3 17.1001Z" fill="#3a3a3a"></path><path d="M14.3 6.9L13 5.6002V10.0001C13 10.6001 12.6 11.0001 12 11.0001C11.4 11.0001 11 10.6001 11 10.0001V5.6002L9.70002 6.9C9.30002 7.3 8.7 7.3 8.3 6.9C7.9 6.5 7.9 5.9001 8.3 5.5001C9.8 4.0001 10.6 3.20005 10.6 3.20005C10.8 3.00005 11.1 2.70005 11.6 2.20005C11.8 2.00005 12.2 2.00005 12.4 2.20005C12.8 2.60005 13.2 3.00005 13.4 3.20005L15.7 5.5001C16.1 5.9001 16.1 6.5 15.7 6.9C15.3 7.2 14.7 7.2 14.3 6.9Z" fill="#3a3a3a"></path></svg>
                </div>
                <div class="name">
                    <span>
                        {{ sortType }}
                    </span>
                </div>
            </div>
        </filter_card>
        <div class="filtered-drop" >
            <card_drop :isOpenWindow="isOpenWindow">
                <ul class="filtered-list" @click="choiseSortType">
                    <li id="sort_by_default">By default</li>
                    <li id="sort_by_type">By type</li>
                    <li id="sort_by_priority">By priority</li>
                    <li id="sort_by_time">By time</li>
                    <li id="sort_by_estimation">By estimation</li>
                </ul>
            </card_drop>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .conteiner-filter-field {
        height: 100%;
        width: 140px;
        margin-right: 20px;
        user-select: none;
        cursor: pointer;
    }
    .wrapper-filter-filed {
        display: flex;
        margin: 0 auto;
        margin-left: 10px;
    }
    .icon {
        margin-right: 5px;
        transform: translateY(2px);
    }
    .name {
        display: flex;
        align-items: center;
        span {
            display: inline-block;
            color: #727581;
        }
    }
    .filtered-drop {

        margin-top: 10px;
        cursor: default;
    }

    .filtered-list {
        width: 100%;
        height: 100%;
        padding: 15px 0;
        li {
            white-space: nowrap;
            padding: 8px 15px;
            margin: 0 5px;
            color: #5e6066;
            font-size: 15px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: #ebebeb8a;
            }
        }
    }

</style>