<script setup>
import table_info_person from "../../../../hoc/table_info_person.vue"
import input_info from "../../../../UI/input_info.vue";

const props = defineProps({
    getInputValue: Function,
    infoAboutUser: Object,   
});


</script>

<template>
        <div class="wrapper-info">
            <div class="title-info">Contacts</div>
            <div class="wrap-inputs">
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Account email'">
                            <input_info :type="'text'" 
                                        :placeholder="'Account email'" 
                                        :value="infoAboutUser['email'] || ''"
                                        @input-v="(event) => getInputValue(event, 'email')"
                            />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Contact email'">
                            <input_info :type="'text'" 
                                        :placeholder="'Contact email'" 
                                        :value="infoAboutUser['contactEmail'] || ''"
                                        @input-v="(event) => getInputValue(event, 'contactEmail')" 
                                        />
                        </table_info_person>
                    </div>      
                </div>
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Work phone'">
                            <input_info :type="'text'" 
                                        :placeholder="'Work phone'" 
                                        :value="infoAboutUser['workPhone'] || ''"
                                        @input-v="(event) => getInputValue(event, 'workPhone')" 
                                        />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Personal phone'">
                            <input_info :type="'text'" 
                                        :placeholder="'Personal phone'" 
                                        :value="infoAboutUser['personalPhone'] || ''"
                                        @input-v="(event) => getInputValue(event, 'personalPhone')" 
                                        />
                        </table_info_person>
                    </div>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .wrapper-info {
        width: 90%;
        margin: 0 auto;
        padding: 30px 0;
        border-radius: 12px;
    }
    .title-info {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 25px;
    }
    .wrap-inputs {
        margin: 20px 0;
    }
    .wrap-inputs-row {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
    }
    .wrap-inputs-row-item {
        width: 48%;
        padding: 10px 0;
    }
</style>