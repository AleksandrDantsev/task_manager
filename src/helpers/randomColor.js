const palette = [
    "#eb5834",
    "#e69cdd",
    "#cd9ce6",
    "#9fb3e3",
    "#94e0a5",
    "#afde92",
    "#e3c28d",
    "#e37b82",
    "#e3a57b",
    "#7d9fe8",
    "#b584e3",
    "#e691c9",
    "#e6df91",
];


export const randomColor = () => {
    const randomNumber = Math.round(Math.random() * 12);
    return palette[randomNumber];
}