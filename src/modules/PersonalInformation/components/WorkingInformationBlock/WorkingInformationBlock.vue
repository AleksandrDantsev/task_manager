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
            <div class="title-info">Working information</div>
            <div class="wrap-inputs">
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Position'">
                            <input_info :type="'text'" 
                                        :placeholder="'Position'" 
                                        :value="infoAboutUser['position'] || ''"
                                        @input-v="(event) => getInputValue(event, 'position')"
                                         />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Hourly rate'">
                            <input_info :type="'number'" 
                                        :placeholder="'Hourly rate'" 
                                        :value="infoAboutUser['hourlyRate'] || ''"
                                        @input-v="(event) => getInputValue(event, 'hourlyRate')"
                                        />
                        </table_info_person>
                    </div>
                </div>
                <div class="wrap-inputs-row">
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Vacation days per year'">
                            <input_info :type="'number'" 
                                        :placeholder="'Vacation days per year'" 
                                        :value="infoAboutUser['vacationDays'] || ''"
                                        @input-v="(event) => getInputValue(event, 'vacationDays')"
                                        />
                        </table_info_person>
                    </div>
                    <div class="wrap-inputs-row-item">
                        <table_info_person :title="'Days off per year'">
                            <input_info :type="'number'" 
                                        :placeholder="'Days off per year'" 
                                        :value="infoAboutUser['daysOff'] || ''"
                                        @input-v="(event) => getInputValue(event, 'daysOff')"
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