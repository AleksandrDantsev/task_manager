<script setup>

</script>

<template>
    <div class="task_text-area">
        <textarea maxlength="200" placeholder="Text of task"></textarea>
    </div>
</template>

<style scoped lang="scss">
    .task_text-area {
        height: 35px;
        padding-top: 5px;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        
        textarea {
            display: inline-block;
            overflow: hidden;
            width: 100%;
            height: 100%;
            resize: none;
            padding: 5px 15px;
            font-size: 14px;
            &:focus {
                outline: none;
            }
    }
    }
    
</style>
