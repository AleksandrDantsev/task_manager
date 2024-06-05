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
            <div class="title-info">Personal information</div>
            <div class="wrap-inputs">
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'First name'">
                            <input_info :type="'text'" 
                                        :placeholder="'First Name'" 
                                        :value="infoAboutUser['firstName'] || ''"
                                        @input-v="(event) => getInputValue(event, 'firstName')"
                                         />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Last name'">
                            <input_info :type="'text'" 
                                        :placeholder="'Last Name'" 
                                        :value="infoAboutUser['lastName'] || ''"
                                        @input-v="(event) => getInputValue(event, 'lastName')"
                                         />
                        </table_info_person>
                    </div>
                </div>
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Date of birth'">
                            <input_info :type="'text'" 
                                        :placeholder="'Date of birth'" 
                                        :value="infoAboutUser['dateBirth'] || ''" 
                                        @input-v="(event) => getInputValue(event, 'dateBirth')"
                                        />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Gender'">
                            <input_info :type="'text'" 
                                        :placeholder="'Gender'" 
                                        :value="infoAboutUser['gender'] || ''" 
                                        @input-v="(event) => getInputValue(event, 'gender')"
                                        />
                        </table_info_person>
                    </div>
                </div>
                <div class="wrap-input-about-me">
                    <table_info_person :title="'About me'">
                        <input_info :placeholder="'About me'" 
                                    :typeInput="'textarea'" 
                                    :value="infoAboutUser['aboutMe'] || ''"
                                    @input-v="(event) => getInputValue(event, 'aboutMe')"
                                    />
                    </table_info_person>
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