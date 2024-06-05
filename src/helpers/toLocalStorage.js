export const saveToLocalStorage = (saveObject, nameStorage = "tasks") => {
    localStorage.setItem(nameStorage, JSON.stringify(saveObject));
};
