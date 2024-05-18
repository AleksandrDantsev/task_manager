import { createStore } from "vuex";
import { getReadableDate } from "../../helpers/getReadableDate";

const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

const saveToLocalStorage = (saveObject, nameStorage = "tasks") => {
    localStorage.setItem(nameStorage, JSON.stringify(saveObject));
};

function createTask(
    date,
    name,
    type = "Action",
    priority = null,
    timeLimit = null,
    assignees = null,
    complete = false,
    project = "",
    subtask = "",
    comment = ""
) {
    const timeSince1970 = new Date().getTime();

    const dataTask = {
        taskName: name,
        id: timeSince1970,
        type,
        date,
        priority,
        timeLimit,
        assignees,
        complete,
        project,
        comments: [],
        subtasks: [],
    };

    if (subtask) {
        dataTask.subtasks.push(subtask); // subtask -> { name: 'string', state: boolean }
    }
    if (comment) {
        dataTask.comments.push(comment); // comment -> { creator: 'string', text: 'string', time: 'string' }
    }

    const localTasks = JSON.parse(localStorage.getItem("tasks")) || {};

    if (!localTasks)
        localStorage.setItem("tasks", JSON.stringify({ [date]: [dataTask] }));

    if (!localTasks?.[date]) {
        localTasks[date] = [dataTask];
    } else {
        localTasks[date].push(dataTask);
    }

    localStorage.setItem("tasks", JSON.stringify(localTasks));
    return localTasks;
}

export default createStore({
    state() {
        return {
            tasksLocalArray: tasks,
            isOpenPanel: false,
            currentInfoEl: {},
        };
    },
    mutations: {
        setCurrentTask(state, data) {
            state.currentInfoEl = data;
        },
        togglePanel(state, isOpen) {
            state.isOpenPanel = isOpen;
        },
        addCommentOrSubtask(state, char) {
            // type -> comments | subtasks
            const tasks = state.tasksLocalArray;
            const [date, id, content, type] = char;
            const currentTask = tasks?.[date];

            if (currentTask) {
                for (let i = 0; i < currentTask.length; i++) {
                    if (currentTask[i].id === id) {
                        currentTask[i][type].push(content);
                        tasks[date] = currentTask;

                        state.tasksLocalArray = { ...tasks };
                        saveToLocalStorage(state.tasksLocalArray);
                        break;
                    }
                }
            }
        },
        changeFieldCommentOrSubtask(state, char) {
            // type -> comments | subtasks  field -> any field
            const [date, idTask, idElement, newName, type, field] = char;
            const tasks = state.tasksLocalArray;
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let task of currentTasks) {
                    if (task.id === idTask) {
                        for (let element of task[type]) {
                            if (element.id === idElement) {
                                element[field] = newName;

                                tasks[date] = currentTasks;
                                state.tasksLocalArray = { ...tasks };

                                saveToLocalStorage(state.tasksLocalArray);
                                break;
                            }
                        }
                    }
                }
            }
        },
        deleteCommentOrSubtask(state, char) {
            // type -> 'comments' | 'subtasks'
            const tasks = state.tasksLocalArray;
            const [date, id, contentId, type] = char;
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let i = 0; i < currentTasks.length; i++) {
                    if (currentTasks[i].id === id) {
                        const withoutDeletedTaskArray = currentTasks[i][
                            type
                        ].filter((el) => el.id !== contentId);
                        currentTasks[i][type] = withoutDeletedTaskArray;
                        break;
                    }
                }
                tasks[date] = currentTasks;
                state.tasksLocalArray = { ...tasks };
                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        addTask(state, char) {
            state.tasksLocalArray = createTask(...char);
        },

        changeInfoTask(state, searchArg = { date: "", id: "" }) {
            if (state.tasksLocalArray?.[searchArg.date]) {
                state.currentInfoEl = state.tasksLocalArray[
                    searchArg.date
                ].find((el) => el.id === searchArg.id);
            }
        },

        deleteTask(state, searchArg = { date: "", id: "" }) {
            const taskInfoObj = state.tasksLocalArray?.[searchArg.date];

            if (taskInfoObj) {
                const result = taskInfoObj.filter(
                    (el) => el.id !== searchArg.id
                );

                state.tasksLocalArray[searchArg.date] = result;
                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        doneTask(state, char) {
            const [date, idTask] = char;
            const tasks = state.tasksLocalArray;
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let task of currentTasks) {
                    if (task.id === idTask) {
                        task["complete"] = !task["complete"];
                        break;
                    }
                }
                tasks[date] = currentTasks;
                state.tasksLocalArray = { ...tasks };

                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        changeValueTask(state, char) {
            // only for key of first level
            const task = state.tasksLocalArray;
            const [date, value, id, type] = char;

            if (task?.[date]) {
                const array = [];
                const interArray = task[date];

                for (let i = 0; i < interArray.length; i++) {
                    if (interArray[i].id !== id) array.push(interArray[i]);
                    else {
                        interArray[i][type] = value;
                        array.push(interArray[i]);
                    }
                }
                task[date] = [...array];
                state.tasksLocalArray = { ...task };

                saveToLocalStorage(task);
            }
        },

        moveTask(state, char) {
            const tasks = state.tasksLocalArray;
            const [date, id, position] = char;

            if (["left", "right"].includes(position)) {
                const regex = /\d+/g;
                let dateDigital = date.match(regex);

                if (dateDigital.length) {
                    const toNumberDate = Number(dateDigital[0]);

                    let day =
                        position === "left"
                            ? toNumberDate - 1
                            : position === "right"
                            ? toNumberDate + 1
                            : toNumberDate;

                    const essentialDate = getReadableDate(0, day);
                    const currentDay = tasks[date];

                    for (let i = 0; i < currentDay.length; i++) {
                        if (currentDay[i].id === id) {
                            let objectSliced = currentDay.splice(i, 1);
                            if (objectSliced)
                                objectSliced[0]["date"] = essentialDate;

                            if (tasks[essentialDate]) {
                                tasks[essentialDate].unshift(...objectSliced);
                            } else {
                                tasks[essentialDate] = objectSliced;
                            }

                            if (!tasks[date].length) delete tasks[date];
                        }
                    }
                }
            } else {
                const currentDay = tasks[date];
                let index = 0;

                for (let i = 0; i < currentDay.length; i++) {
                    if (currentDay[i].id === id) {
                        index = i;
                        break;
                    }
                }
                const task = currentDay.splice(index, 1);

                const step = (function () {
                    if (position === "up") {
                        return index <= 0 ? (index = 0) : (index -= 1);
                    } else if (position === "down") {
                        return index >= currentDay.length
                            ? currentDay.length
                            : (index += 1);
                    }
                    return index;
                })();

                currentDay.splice(step, 0, ...task);
                tasks[date] = currentDay;
            }
            state.tasksLocalArray = { ...tasks };
            saveToLocalStorage(tasks);
        },
    },
    actions: {
        // actions for module 1
    },
    getters: {
        getTask: (state) => (char) => {
            const [date, idTask] = char;
            const task = state.tasksLocalArray?.[date];
            if (task) {
                return task.find((el) => el.id === idTask);
            }
        },
        getLevelSubtasks: (state) => (char) => {
            const [date, idSubtask] = char;
            const task = state.tasksLocalArray?.[date];

            let quantityCompletedSubtask = 0;
            let quantitySubtasksAll = 0;

            if (task) {
                const currentTask = task.find((el) => el.id === idSubtask);

                if (currentTask) {
                    const subtasks = currentTask["subtasks"];
                    for (let item of subtasks) {
                        if (item.isCompleted) quantityCompletedSubtask++;
                    }
                    quantitySubtasksAll = subtasks.length;
                }
            }
            return [quantityCompletedSubtask, quantitySubtasksAll];
        },
        getStateIsCompletedTask: (state) => (char) => {
            const [date, idTask] = char;
            const tasks = state.tasksLocalArray;
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let task of currentTasks) {
                    if (task.id === idTask) {
                        return task["complete"];
                    }
                }
            }
        },
    },
});
