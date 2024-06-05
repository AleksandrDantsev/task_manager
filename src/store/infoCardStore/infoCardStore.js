import { getReadableDate } from "../../helpers/getReadableDate";
import { createTask } from "../../helpers/createTask";
import { saveToLocalStorage } from "../../helpers/toLocalStorage";

const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
const binTasks = JSON.parse(localStorage.getItem("bin")) || [];

export const infoTask = {
    state() {
        return {
            tasksLocalArray: tasks,
            isOpenPanel: false,
            currentInfoEl: {},
            sortType: "sort_by_default",
            binCard: binTasks,
        };
    },
    mutations: {
        deleteTaskFromBin(state, id) {
            let binTask = state.binCard;
            if (binTask.length) {
                binTask = binTask.filter(el => el.id !== id);

                state.binCard = binTask;
                saveToLocalStorage(state.binCard, "bin");
            }
        },
        setCurrentTask(state, data) {
            state.currentInfoEl = data;
        },
        togglePanel(state, isOpen) {
            state.isOpenPanel = isOpen;
        },
        addCommentOrSubtask(state, char) {
            const [date, id, content, type, project] = char; // type -> comments | subtasks
            const tasks = state.tasksLocalArray?.[project];
            const currentTask = tasks?.[date];

            if (currentTask) {
                for (let i = 0; i < currentTask.length; i++) {
                    if (currentTask[i].id === id) {
                        currentTask[i][type].push(content);
                        tasks[date] = currentTask;

                        state.tasksLocalArray[project] = { ...tasks };
                        saveToLocalStorage(state.tasksLocalArray);
                        break;
                    }
                }
            }
        },
        changeFieldCommentOrSubtask(state, char) {
            // type -> comments | subtasks  field -> any field
            const [date, idTask, idElement, newName, type, field, project] = char;
            const tasks = state.tasksLocalArray[project];
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let task of currentTasks) {
                    if (task.id === idTask) {
                        for (let element of task[type]) {
                            if (element.id === idElement) {
                                element[field] = newName;

                                tasks[date] = currentTasks;
                                state.tasksLocalArray[project] = { ...tasks };

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
            const [date, id, contentId, type, project] = char;
            const tasks = state.tasksLocalArray[project];
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
                state.tasksLocalArray[project] = { ...tasks };
                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        addTask(state, char) {
            const [data, project] = char;
            state.tasksLocalArray = createTask(...data, project);
            saveToLocalStorage(state.tasksLocalArray);
        },

        setActiveTask(state, char) {
            const [date, id,  project, type] = char;
            if (!type) { // type !== 'bin'
                if (state.tasksLocalArray?.[project]?.[date]) {
                    const activeTask = state.tasksLocalArray[project][date].find((el) => el.id === id);
                    state.currentInfoEl = activeTask;
                }
            }
            else {
                if (state.binCard.length) {
                    const activeTask = state.binCard.find((el) => el.id === id);
                    state.currentInfoEl = activeTask;
                }
            }
        },

        deleteTask(state, char) {
            const [date, id,  project] = char;
            const taskInfoObj = state.tasksLocalArray?.[project]?.[date];

            if (taskInfoObj) {
                const deletedTasks = state.binCard;

                const result = taskInfoObj.filter(
                    (el) => {
                       if (el.id !== id) return el;
                       else deletedTasks.push(el);
                    }
                );
                if (result.length === 0) delete state.tasksLocalArray[project][date];
                else {
                    state.tasksLocalArray[project][date] = result;
                }    

                state.binCard = [ ...deletedTasks ];
                saveToLocalStorage(state.binCard, "bin");
                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        doneTask(state, char) {
            const [date, idTask, project] = char;
            const tasks = state.tasksLocalArray;
            let currentTasks = tasks?.[project]?.[date];

            if (currentTasks) {
                // for (let task of currentTasks) {
                //     if (task.id === idTask) {
                //         task["complete"] = !task["complete"];
                //         break;
                //     }
                // }
                console.log(currentTasks)
                currentTasks = currentTasks.map(el => {
                    if (el.id === idTask) {
                        const task = el;
                        task["complete"] = !el["complete"]
                        return { ...task };
                    }
                    return { ...el };
                })

                tasks[project][date] = [ ...currentTasks];

                state.tasksLocalArray = { ...tasks };

                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        doneTaskInMyTasks(state, char) {

        },

        changeValueTask(state, char) {
            // only for key of first level
            const [date, value, id, type, project] = char;
            const tasks = state.tasksLocalArray;

            if (tasks?.[project]?.[date]) {
                let array = [];
                const interArray = tasks[project][date];

                for (let i = 0; i < interArray.length; i++) {
                    if (interArray[i].id !== id) array.push(interArray[i]);
                    else {
                        interArray[i][type] = value;
                        array.push(interArray[i]);
                    }
                }
                tasks[project][date] = [...array];
                array = [];
                state.tasksLocalArray = { ...tasks };

                saveToLocalStorage(state.tasksLocalArray);
            }
        },

        moveTask(state, char) {
            const [date, id, position, project] = char;
            const tasks = state.tasksLocalArray?.[project];

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

                            if (tasks[date].length === 0) delete tasks[date];
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
            state.tasksLocalArray[project] = { ...tasks };
            saveToLocalStorage(tasks);
        },
        setTypeSort(state, type) {
            if (type) state.sortType = type;
        },
    },
    actions: {
        // actions for module 1
    },
    getters: {
        getTask: (state) => (char) => {
            const [date, idTask, project] = char;
            const task = state.tasksLocalArray?.[project]?.[date];
            if (task) {
                return task.find((el) => el.id === idTask);
            }
            else return [];
        },
        getLevelSubtasks: (state) => (char) => {
            const [date, idSubtask, project] = char;
            const task = state.tasksLocalArray?.[project]?.[date];

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
        getFieldFirstLevelTask: (state) => (char) => {
            const [date, idTask, type, project] = char;
            const tasks = state.tasksLocalArray?.[project];
            const currentTasks = tasks?.[date];

            if (currentTasks) {
                for (let task of currentTasks) {
                    if (task.id === idTask) {
                        return task[type];
                    }
                }
            }
        },
        getQuantityCompletedTasks: (state) => (project) => {
            if (state.tasksLocalArray?.[project]) {
                const allTasks = Object.values(state.tasksLocalArray[project]).flat();

                let quantityCompletedTasks = 0;
                let quantityTasks = allTasks.length;

                for (let item of allTasks) {
                    if (item.complete === true) quantityCompletedTasks++;
                }
                return [quantityCompletedTasks, quantityTasks];
            }
            return [0, 0];
        },
        getSortedTask: (state) => (char) => {
            const [date, project] = char;
            const taskByDate = state.tasksLocalArray?.[project]?.[date];
            const typeSorted = state.sortType;

            if (taskByDate) {
                if (typeSorted === "sort_by_priority") {
                    const prioritySorted = {
                        high: [],
                        middle: [],
                        low: [],
                        neutral: [],
                    };

                    for (let task of taskByDate) {
                        if (task.priority in prioritySorted)
                            prioritySorted[task.priority].push(task);
                        else prioritySorted["neutral"].push(task);
                    }
                    return Object.values(prioritySorted).flat();
                } 

                else if (typeSorted === "sort_by_default") return taskByDate;

                else if (typeSorted === "sort_by_time") {
                    const arrayForSort = [...taskByDate];
                    return arrayForSort.sort((a, b) => b.id - a.id)
                } 

                else if (typeSorted === "sort_by_estimation") {

                    const toMinutes = (objectTime) => {
                        if (objectTime instanceof Object) {
                            const hours = objectTime.h;
                            const min = objectTime.m;

                            return (Number(hours) * 60 + Number(min));
                        }
                        return Infinity;
                    }
                    const arrayForSort = [...taskByDate];
                    return arrayForSort.sort((a, b) => toMinutes(a.timeLimit) - toMinutes(b.timeLimit));


                } 
                else if (typeSorted === "sort_by_type") {
                    const typeSorted = {
                        Call: [],
                        Meeting: [],
                        Action: [],
                    };
                    for (let task of taskByDate) {
                        if (task.type in typeSorted)
                            typeSorted[task.type].push(task);
                    }
                    return Object.values(typeSorted).flat();
                }

                else return taskByDate;
            }
        },
    },
};
