<script setup>
    import { useStore } from "vuex";

    const store = useStore();

    const setTypeTask = (e) => {

        const task = store.state.infoTask.currentInfoEl;
        const idTarget = e.target.id;

        if (idTarget) {
            const nameProject = store.state.projectsStore.currentProject;
            const priorityValues = {
                "action-type": "Action",
                "meeting-type": "Meeting",
                "call-type": "Call",
            };

            store.commit("changeValueTask", [
                task.date,
                priorityValues[idTarget],
                task.id,
                "type",
                nameProject,
            ]);
        }
    }

</script>

<template>
    <div class="wrapper-type-task">
        <ul class="task-type-list" @click="setTypeTask">
            <li id="action-type">
                <div class="icon">
                    <svg data-v-69013cdb="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropdown-item__icon v-icon-colored__svg" style="fill: rgb(202, 202, 210); height: 16px; width: 16px;"><path opacity="0.39" d="M14 16.9C14.3 17 14.7 17 15 17C17.8 17 20 14.8 20 12C20 9.2 17.8 7 15 7C14.7 7 14.3 6.99998 14 7.09998C13.4 6.49998 12.8 6.00001 12 5.70001C12.9 5.30001 13.9 5 15 5C18.9 5 22 8.1 22 12C22 15.9 18.9 19 15 19C13.9 19 12.9 18.8 12 18.3C12.7 18 13.4 17.5 14 16.9Z" fill="##e01212"></path><path d="M12 18.3C9.40001 19.5 6.20001 19.1 4.00001 16.9C1.30001 14.2 1.30001 9.70001 4.00001 7.00001C6.20001 4.8 9.40001 4.39998 12 5.59998C12.8 5.99998 13.4 6.4 14 7.00001C14.6 7.7 15.1 8.40002 15.5 9.20002C15.8 10 16 10.9 16 11.9C16 12.9 15.8 13.8 15.5 14.6C15.2 15.4 14.7 16.2 14 16.8C13.4 17.5 12.8 18 12 18.3ZM13.7 10.2C13.6 9.90002 13.4 9.59999 13.2 9.29999L6.29999 16.2C6.59999 16.4 6.90002 16.6 7.20002 16.7L13.7 10.2ZM14 12.7L9.79999 16.9C10.8 16.8 11.8 16.3 12.6 15.5C13.4 14.7 13.8 13.7 14 12.7ZM11.8 7.79999C11.5 7.59999 11.2 7.39999 10.9 7.29999L4.4 13.8C4.5 14.1 4.7 14.4 4.9 14.7L11.8 7.79999ZM4.00001 11.3L8.20002 7.09998C7.20002 7.19998 6.2 7.7 5.4 8.50001C4.6 9.30001 4.20001 10.3 4.00001 11.3Z" fill="##e01212"></path></svg>
                </div>
                <span class="name">
                    Action
                </span>
            </li>
            <li id="meeting-type">
                <div class="icon">
                    <svg data-v-69013cdb="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropdown-item__icon v-icon-colored__svg" style="fill: rgb(202, 202, 210); height: 16px; width: 16px;"><path opacity="0.39" d="M15 19H9V21H15V19Z" fill="##e01212"></path><path d="M16 17C16 15.3 14.7 14 13 14H11C9.3 14 8 15.3 8 17V21C6.9 21 6 20.1 6 19H4C2.9 19 2 18.1 2 17V15C2 13.1 3.10001 11.4 4.70001 10.6C4.00001 9.79998 3.5 8.7 3.5 7.5C3.5 5 5.5 3 8 3C9.5 3 10.9 3.8 11.7 5C11.8 5 11.9 5 12 5C12.1 5 12.2 5 12.3 5C13.1 3.8 14.5 3 16 3C18.5 3 20.5 5 20.5 7.5C20.5 8.7 20 9.79998 19.3 10.6C20.9 11.4 22 13.1 22 15V17C22 18.1 21.1 19 20 19H18C18 20.1 17.1 21 16 21V17ZM18 17H20V15C20 13.3 18.7 12 17 12H15.7C15.6 12.2 15.4 12.4 15.3 12.6C16.9 13.4 18 15.1 18 17ZM18.5 7.5C18.5 6.1 17.4 5 16 5C15.4 5 14.8 5.19998 14.3 5.59998C15.6 6.39998 16.5 7.8 16.5 9.5C16.5 9.7 16.5 9.8 16.5 10C17.6 9.7 18.5 8.7 18.5 7.5ZM14.4 10C14.4 9.8 14.5 9.6 14.5 9.5C14.5 8.1 13.4 7 12 7C10.6 7 9.5 8.1 9.5 9.5C9.5 10.9 10.6 12 12 12C13.2 12 14.2 11.2 14.4 10ZM6 17C6 15.1 7.10001 13.4 8.70001 12.6C8.50001 12.4 8.39999 12.2 8.29999 12H7C5.3 12 4 13.3 4 15V17H6ZM8 5C6.6 5 5.5 6.1 5.5 7.5C5.5 8.7 6.4 9.7 7.5 10C7.5 9.9 7.5 9.7 7.5 9.5C7.5 7.9 8.40001 6.39998 9.70001 5.59998C9.20001 5.19998 8.6 5 8 5Z" fill="##e01212"></path></svg>
                </div>
                <span class="name">
                    Meeting
                </span>
            </li>
            <li id="call-type">
                <div class="icon">
                    <svg data-v-69013cdb="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropdown-item__icon v-icon-colored__svg" style="fill: rgb(202, 202, 210); height: 16px; width: 16px;"><path opacity="0.39" d="M18.3 10.1C18.3 10.6 17.9 11 17.4 11C16.9 11 16.5 10.6 16.5 10.1C16.5 8.59998 15.3 7.40002 13.8 7.40002C13.3 7.40002 12.9 7 12.9 6.5C12.9 6 13.3 5.59998 13.8 5.59998C16.3 5.69998 18.3 7.69998 18.3 10.1Z" fill="##e01212"></path><path d="M9.70001 10.2L13.7 14.2L14.4 13.5C15.5 12.4 17.3 12.4 18.4 13.5L19.1 14.2C20.2 15.3 20.2 17.1 19.1 18.2L18.4 18.9L18.3 19L17.7 19.6C16.1 21.2 13.6 21.3 12.1 19.8C10.3 18.5 8.80001 17.3 7.70001 16.1C6.80001 15.2 5.5 13.7 4 11.7C2.5 10.2 2.60001 7.69998 4.20001 6.09998L4.79999 5.5L4.89999 5.40002L5.6 4.69995C6.7 3.59995 8.5 3.59995 9.6 4.69995L10.3 5.40002C11.4 6.50002 11.4 8.30002 10.3 9.40002L9.70001 10.2ZM21 10.1C21 10.6 20.6 11 20.1 11C19.6 11 19.2 10.6 19.2 10.1C19.2 7.19998 16.8 4.80005 13.9 4.80005C13.4 4.80005 13 4.40002 13 3.90002C13 3.40002 13.4 3 13.9 3C17.8 3 21 6.19998 21 10.1ZM8.39999 8.90002L9.1 8.19995C9.5 7.79995 9.5 7.20002 9.1 6.90002L8.39999 6.19995C7.99999 5.79995 7.4 5.79995 7.1 6.19995L6.39999 6.90002L5.6 7.69995C4.7 8.59995 4.79999 9.89998 5.39999 10.6L5.5 10.7L5.6 10.8C7.1 12.7 8.2 14.1 9.1 15C10.2 16.1 11.6 17.2 13.3 18.5L13.4 18.6L13.5 18.7C14.2 19.4 15.5 19.4 16.4 18.5L17.2 17.7L17.9 17C18.3 16.6 18.3 16 17.9 15.7L17.2 15C16.8 14.6 16.2 14.6 15.9 15L15.2 15.7C14.5 16.4 13.3 16.4 12.5 15.7L8.5 11.7C7.6 10.8 7.59999 9.60002 8.39999 8.90002Z" fill="##e01212"></path></svg>
                </div>
                <span class="name">
                    Call
                </span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.wrapper-type-task {
    width: 100%;
    height: 100%;
    padding: 20px;
}
.task-type-list {
    li {
        display: flex;
        padding: 3px;
        width: 100%;
        margin: 4px 0;
        text-align: left;
        cursor: pointer;
    }
}
.icon {
    display: flex;
    align-items: center;
    margin-right: 10px;
    pointer-events: none;

}
.name {
    pointer-events: none;
}
</style>