export const capitalize = (string) => {
    const stringTrim = string.trim();
    return stringTrim.slice(0, 1).toUpperCase() + stringTrim.slice(1);
};
