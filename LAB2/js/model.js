let timerInterval;
let startTime;
let elapsedTime = 0;
let isTimerRunning = false;

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / (60 * 60 * 1000));
    let minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

    return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}
function startTimer() {
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(function() {
        let currentTime = new Date().getTime();
        elapsedTime = currentTime - startTime;
        displayTimer(formatTime(elapsedTime));
    }, 1000);
}
function pad(number, length) {
    let str = String(number);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTimer(formatTime(elapsedTime));
}
function pauseTimer() {
    clearInterval(timerInterval);
}