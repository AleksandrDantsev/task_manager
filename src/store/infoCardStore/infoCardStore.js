import { createStore } from 'vuex';
import { getReadableDate } from '../../helpers/getReadableDate';

const tasks = JSON.parse(localStorage.getItem("tasks"))

function createTask(  date, 
    name, 
    type="Action", 
    priority=null, 
    timeLimit=null,
    assignees=null,
    complete=false,
    subtask='',
    comment=''
) {

const timeSince1970 = (new Date).getTime();

const dataTask = {
taskName: name,
id: timeSince1970,
type,
date,
priority,
timeLimit,
assignees,
complete,
comments: [],
subtasks: [],
};

if (subtask) {
dataTask.subtasks.push(subtask) // subtask -> { name: 'string', state: boolean }
}
if (comment) {
dataTask.comments.push(comment) // comment -> { creator: 'string', text: 'string', time: 'string' }
}

const localTasks = JSON.parse(localStorage.getItem("tasks"));

if (!localTasks) localStorage.setItem("tasks", JSON.stringify( {[date]: [dataTask]} ))

if (!localTasks[date]) {
localTasks[date] = [dataTask];
localStorage.setItem("tasks", JSON.stringify( localTasks ))
}
else {
console.log(localTasks[date])
localTasks[date].push(dataTask);
localStorage.setItem("tasks", JSON.stringify( localTasks ))
return localTasks;
}
}


export default createStore({
  state() {
    return {
        "tasksLocalArray": tasks,
        "isOpenPanel": false,
        "currentInfoEl": {},
    };
  },
  mutations: {
    togglePanel(state, isOpen) {
        state.isOpenPanel = isOpen;
    },
    addTask(state, char) {
        state.tasksLocalArray = createTask(...char);
    },
    changeInfoTask(state, searchArg = {date: '', id: ''}) {
        if (state.tasksLocalArray?.[searchArg.date]) {
            state.currentInfoEl = state.tasksLocalArray[searchArg.date].find(el => el.id === searchArg.id);
        }
    },
    deleteTask(state, searchArg = {date: '', id: ''}) {
        const taskInfoObj = state.tasksLocalArray?.[searchArg.date];

        if (taskInfoObj) {
            const result = taskInfoObj.filter(el => el.id !== searchArg.id);

            state.tasksLocalArray[searchArg.date] = result
            localStorage.setItem("tasks", JSON.stringify( state.tasksLocalArray ))
            
        }
    },
    changePriority(state, char) { // [date, priority, id]
        const task = state.tasksLocalArray;
        console.log(state.tasksLocalArray)
        if (task?.[char[0]]) {
            const array = [];
            const interArray = task[char[0]];

            for (let i = 0; i < interArray.length; i++) {
                if (interArray[i].id !== char[2]) array.push(interArray[i]);
                else {
                    interArray[i]['priority'] = char[1];
                    array.push(interArray[i]);
                }
            }
            task[char[0]] = [...array];
            state.tasksLocalArray = { ...task };

            localStorage.setItem("tasks", JSON.stringify( task ))
        }
    },
    moveTask(state, char) { // char == [date, id, position]
        const tasks = state.tasksLocalArray;
        
        if (["left", "right"].includes(char[2])) {
            const regex = /\d+/g;
            let dateDigital = char[0].match(regex);

            if (dateDigital.length) {
                const toNumberDate = Number(dateDigital[0]);

                let day = char[2] === 'left' ? toNumberDate - 1 : 
                         (char[2] === 'right' ? toNumberDate + 1 : toNumberDate);
    
                const essentialDate = getReadableDate(0, day);
                const currentDay = tasks[char[0]];
    
                for (let i = 0; i < currentDay.length; i++) {
                    if (currentDay[i].id === char[1]) {
                        let objectSliced = currentDay.splice(i, 1);
                        if (objectSliced) objectSliced[0]["date"] = essentialDate;

                        if (tasks[essentialDate]) {
                            tasks[essentialDate].unshift(...objectSliced);
                        }
                        else {
                            tasks[essentialDate] = objectSliced;
                        }

                        if (!tasks[char[0]].length) delete tasks[char[0]];
                    }
                }
            }
        }
        else {
            const currentDay = tasks[char[0]];
            let index = 0;

            for (let i = 0; i < currentDay.length; i++) {
                if (currentDay[i].id === char[1]) {
                    index = i;
                    break;
                }
            }
            const task = currentDay.splice(index, 1);
            
            const step = (function() {
                if (char[2] === "up") {
                    return index <= 0 ? index = 0 : index -= 1;
                }
                else if (char[2] === "down") {
                    return index >= currentDay.length ? currentDay.length : index += 1;
                }
                return index;
            })()

            currentDay.splice(step, 0, ...task);
            tasks[char[0]] = currentDay;

        }
        state.tasksLocalArray = {...tasks};
        localStorage.setItem("tasks", JSON.stringify( tasks ))
    }
  },
    actions: {
    // actions for module 1
  },
  getters: {
    getTask:(state) => (char) => { // char == [date, id] 
        const task = state.tasksLocalArray?.[char[0]];
        if (task) {
            return task.find(el => el.id === char[1]);
        }
    },
  }
});