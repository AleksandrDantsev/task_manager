
export class LS {
    static createTask(  date, 
                        name, 
                        type="action", 
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
        }
    }

    static deleteTask(date, name) {
        const localTasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(date, name)
        if (localTasks?.[date]) {
            localTasks[date] = localTasks[date].filter(el => el['taskName'] !== name);
            localStorage.setItem("tasks", JSON.stringify( localTasks ))
        }
    }

    static getTasks(date) {
        const localTasks = JSON.parse(localStorage.getItem("tasks"));

        if (localTasks?.[date]) {
            return localTasks[date];
        }
        else return [];
    }


}