<script setup>
    import { useStore } from "vuex";

    const store = useStore();

    const setPriority = (e) => {
        const task = store.state.infoTask.currentInfoEl;
        const idTarget = e.target.id;
        const nameProject = store.state.projectsStore.currentProject;

        if (idTarget) {
            const priorityValues = {
                "without-priority-set": null,
                "low-priority": "low",
                "middle-priority": "middle",
                "high-priority": "high",
            };

            store.commit("changeValueTask", [
                task.date,
                priorityValues[idTarget],
                task.id,
                "priority",
                nameProject,
            ]);
        }

    }

</script>

<template>
    <div class="wrapper-task-priority" @click="setPriority">
        <span class="without-priority" id="without-priority-set">Without priority</span>
        <ul class="task-priority-list">
            <li id="low-priority">
                <span class="low-set">low</span>
            </li>
            <li id="middle-priority">
                <span class="middle-set">middle</span>
            </li>
            <li id="high-priority">
                <span class="high-set">high</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper-task-priority {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px 10px;
    }
    .task-priority-list {
        display: flex;
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
            margin: 2px;
            text-align: left;
            padding: 2px 10px;
            border-radius: 4px;
            font-size: 15px;
            color: #fff;
            pointer-events: none;
        }
    }
    .without-priority  {
        display: block;
        width: 84%;
        padding: 5px 0;
        border-radius: 4px;
        color: unset;
        &:hover {
            background-color: #f5f5f593;
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