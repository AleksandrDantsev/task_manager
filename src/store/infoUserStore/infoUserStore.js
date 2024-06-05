import { saveToLocalStorage } from "../../helpers/toLocalStorage";

const infoUserBase = {
    firstName: "Test",
	lastName: "User",
	password: "23423ewrwer",
	dateBirth: "",
	gender: "",
	email: "alexdantsev@mail.ru",
	bannerImage: "",
	avatarImage: "",
	aboutMe: "",
	contactEmail: "",
	workPhone: "",
	personalPhone: "",
	position: "",
    hourlyRate: "",
    vacationDays: "",
    daysOff: "",
}

let INFO_USER = JSON.parse(localStorage.getItem("USER_INFO"));

if (!INFO_USER) {
    INFO_USER = infoUserBase;
    saveToLocalStorage(INFO_USER, "USER_INFO");
}

export const infoUser = {
    state() {
        return {
            infoUserState: INFO_USER,
            mockInfoUser: { ...INFO_USER },
        }
    },
    mutations: {
        changeInfoValue(state, char) {
            const [field, val] = char;

            if (field && state.mockInfoUser) {
                state.mockInfoUser[field] = val;
            }
        },
        setInfoUserOnClick(state) {
            const changedInfoObject = state.mockInfoUser;
            state.infoUserState = changedInfoObject;
            saveToLocalStorage(changedInfoObject, "USER_INFO");
        },
        setValueUserInfo(state, char) {
            const [field, val] = char;
            if (field && state.infoUserState) {
                state.infoUserState[field] = val;
                saveToLocalStorage(state.infoUserState, "USER_INFO");
            }
        },
    },
    getters: {

    },
}