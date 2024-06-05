export const getHoursAndMin = () => {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    hours = hours < 10 ? '0' + hours : hours; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var timeString = hours + ':' + minutes;
    return String(timeString);
}
