export function createTask(
    date,
    name,
    project = "",
) {
    const timeSince1970 = (new Date()).getTime();

    const dataTask = {
        taskName: name,
        date,
        id: timeSince1970,
        type: "Action",
        priority: null,
        timeLimit: null,
        assignees: null,
        complete: false,
        project,
        comments: [],
        subtasks: [],
        westedTime: 0,
    };

    const localTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!localTasks) {
        localStorage.setItem("tasks", JSON.stringify({[project] : { [date]: [dataTask] }}));
    }


    if (!localTasks[project]?.[date]) {
        localTasks[project][date] = [dataTask];
    } 
    else {
        localTasks[project][date].push(dataTask);
    }

    return localTasks;
}