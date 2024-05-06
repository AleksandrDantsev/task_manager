<script setup>

const props = defineProps({
    text: String,
    deleteTask: Function,
})

</script>

<template>
    <div class="confirm-window">
        <div class="wrapper">
            <div class="question">
                {{ props.text }}
            </div>
            <div class="buttons">
                <button class="delBt" @click="() => props.deleteTask(true)">Yes</button>
                <button class="passBt" @click="() => props.deleteTask(false)">No</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .confirm-window {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 350px;
        height: 200px;
        padding: 20px;
        padding-bottom: 30px;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 10px 0 #d4d4d4d8;
        border-radius: 10px;
        background-color: #fff;
    }
    .wrapper {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }
    .question {
        height: 20%;
        text-align: center;
        font-size: 22px;
    }
    .buttons {
        display: flex;
        justify-content: space-around;
        button {
            height: 40px;
            width: 90px;
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
            color: #fff;
            box-shadow: 0 0 5px 0 #d4d4d4d8;
            transition-duration: 300ms;
        }
    }
    .delBt {
        background-color: #df2424;
        &:hover {
            background-color: #ca2020;  
        }
    }
    .passBt {
        background-color: #246fdf;
        &:hover {
            background-color: #1f64ca;  
        }
    }
</style>