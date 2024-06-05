export function secondsFormat(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    remainingSeconds = String(remainingSeconds).padStart(2, '0');

    return `${hours}:${minutes}:${remainingSeconds}`;
}