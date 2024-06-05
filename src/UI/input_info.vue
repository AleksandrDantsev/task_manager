<script setup>
    const props = defineProps({
        value: String,
        type: String,
        placeholder: String,
        typeInput: String,
    });
</script>

<template>
    <textarea v-if="typeInput === 'textarea'"
        class="input-info textarea-info-personal" 
        :placeholder="placeholder" 
        @input="$emit('input-v', $event)"  
        :value="value || null" 
        cols="30" 
        rows="10">
    </textarea>
    <input v-else class="input-info" 
        :type="type" 
        :placeholder="placeholder" 
        @input="$emit('input-v', $event)" 
        :value="value || null">
</template>

<style lang="scss" scoped>
    .input-info {
        width: 100%;
        height: 45px;
        border-radius: 6px;
        padding: 0 15px;
        background-color: #f8f8fb;
        transition-duration: 400ms;
        &:hover {
            background-color: #f0f0f0ce;
        }
    }
    .textarea-info-personal {
        padding: 15px;
        height: 150px;
        resize: none;
    }
</style>