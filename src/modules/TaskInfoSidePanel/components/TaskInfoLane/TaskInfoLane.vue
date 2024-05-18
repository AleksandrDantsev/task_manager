<script setup>
import buttonRegular from '../../../../UI/button-regular.vue';
    const props = defineProps({
        name: String,
        textButton: String,
        value: String,
    });

</script>

<template>
    <div class="row">
        <div class="view-info">
            <div class="icon">
                <slot></slot>
            </div>
            <div class="name"><h5>{{ props.name }}</h5></div>
        </div>
        <div class="actions-info" @click="$emit('setValue', textButton)"
            :class="{'priority': name === 'Priority', ['pr-' + value]: Boolean(props.value)}" >
            <buttonRegular v-if="!value" :text="props.textButton" :style="'classic'"/>
            <buttonRegular v-else-if="name !== 'Priority'" :text="props.value" :style="'unvisible'"/>
            <span v-else class="priority-text" >{{ value }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .row {
        display: flex;
        width: 100%;
        padding: 5px 0;
        margin-bottom: 5px;
    }
    .view-info {
        display: flex;
        align-items: center;
    }
    .icon {
        margin-right: 12px;
        display: flex;
        align-items: center;
    }
    .name {
        width: 200px;
        margin: 0 auto;
        h5 {
            font-size: 15px;
            color: #888686;
        }
    }
    .actions-info {
        min-width: 40px;
        text-align: center;
        padding: 3px 2px;
        border-radius: 5px;
        font-size: 16px;
    }

    .priority {
        position: relative;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .priority-text {
        color: #fff;
    }
    .pr-low {
        background-color: #54be54b6;
    }
    .pr-middle {
        background-color: #fac002b7;
    }
    .pr-high {
        background-color: #da0404da;
    }
</style>