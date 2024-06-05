import { infoTask } from "./infoCardStore/infoCardStore"
import { projectsStore } from "./projectsStore/projectsStore"
import { createStore } from "vuex/dist/vuex.cjs.js"
import { infoUser } from "./infoUserStore/infoUserStore"

export const store = createStore({
    modules: {
        infoTask,
        projectsStore,
        infoUser,
    }
  })