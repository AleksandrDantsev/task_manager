<script setup>



// @click="setPriority"
</script>
<template>
    <div class="wrapper-priority">
        <ul class="list-priority" @click="$emit('open-or-close', $event.target.getAttribute('data-priority_set'))">
            <li data-priority_set="null"><span class="without-set">Without a priority</span></li>
            <li data-priority_set="low"><span class="low-set">Low</span></li>
            <li data-priority_set="middle"><span class="middle-set">Middle</span></li>
            <li data-priority_set="high"><span class="high-set">High</span></li>
        </ul>
    </div>
</template>
<style scoped lang="scss">
    .wrapper-priority {
        width: 180px;
        margin: 10px 0;
        padding: 0 10px;
    }

    .list-priority {
        li {
            border-radius: 5px;
            padding: 2px 1px;;
            cursor: pointer;
            &:hover {
                background-color: #f5f5f593;
            }
        }
        span {
            display: block;
            width: max-content;
            margin: 5px;
            text-align: left;
            padding: 1px 10px;
            border-radius: 3px;
            font-size: 15px;
            color: #fff;
            pointer-events: none;
        }
        .without-set  {
            color: unset;
            padding: 0;
        }
    }

    .low-set {
        background-color: #54be54b6;
    }
    .middle-set {
        background-color: #fac002b7;
    }
    .high-set {
        background-color: #da0404da;
    }
</style>