import { saveToLocalStorage } from "../../helpers/toLocalStorage";

const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
const currentProjectLocal = JSON.parse(localStorage.getItem("turnOnProject")) || "Project";

export const projectsStore = {
    state() {
        return {
            allTasksInProject: tasks,
            currentProject: currentProjectLocal,
            searchProjectName: '',
        }
    },
    mutations: {
        createProject(state, name) {
            if (!(name in state.allTasksInProject)) {
                const projects = state.allTasksInProject;

                projects[name] = {};
                state.allTasksInProject = { ...projects };
                state.currentProject = name;
                saveToLocalStorage(projects);
            }
        },
        switchProject(state, name) {
            state.currentProject = name;
            saveToLocalStorage(name, 'turnOnProject');
        },
        setStringSearch(state, name) {
            state.searchProjectName = name;
        },
        copyProject(state, name) {
            const projects = state.allTasksInProject;
            if (projects && name) {
                for (let project in projects) {
                    if (name === project) {
                        let copyProjectName = project + "-Copy";

                        const internalObjects = JSON.stringify(projects[project]);
                        projects[copyProjectName] = JSON.parse(internalObjects); 
                        console.log(projects)
                    }
                }
                state.allTasksInProject = { ...projects };
                saveToLocalStorage(projects);
            }
        },
        deleteProject(state, name) {
            const projects = state.allTasksInProject;
            
            if (projects && name) {
                delete projects[name];

                state.allTasksInProject = { ...projects };
                saveToLocalStorage(projects);
            }
        },
        alterNameProject(state, char) {
            const [oldname, newname] = char;
            const projects = state.allTasksInProject;
            if (projects) {
                let currentProjectData;

                for (let project in projects) {
                    if (project === oldname) {
                        currentProjectData = projects[project];
                        projects[newname] = { ...currentProjectData };
                        delete projects[oldname];
                        break;
                    }
                }

                state.allTasksInProject = { ...projects };
                saveToLocalStorage(projects);
            }
        }
    },
    getters: {
        getFoundProjects: (state) => {
            if (!state.searchProjectName) {
                if (state.allTasksInProject) {
                    return Object.keys(state.allTasksInProject)
                }
            }
            else {
                const toFormat = (string) => string.toLowerCase().trim();
                const formatString = toFormat(state.searchProjectName);

                if (state.allTasksInProject) {
                    return Object.keys(state.allTasksInProject).filter(el => toFormat(el).indexOf(formatString) !== -1);
                }
            }
            return [];
        },
        getProjectsName: (state) => {
            if (state.allTasksInProject) {
                return Object.keys(state.allTasksInProject);
            }
        }
    },
};