export const getReadableDate = (shiftBackDay = 0) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const date = new Date();

    const mounth = date.getMonth();
    const day = date.getDate();
    const year = date.getYear();

    const rightDate = new Date(year, mounth, day - shiftBackDay);

    const dayOfWeek = daysOfWeek[rightDate.getDay()];
    const dayOfMonth = rightDate.getDate();
    const mounthCount = rightDate.getMonth();
    
    return `${dayOfWeek}, ${dayOfMonth} ${months[mounthCount]}`;
}