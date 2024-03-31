$(document).ready(function() {
    $("#start").click(function() {
        if (!isTimerRunning) {
            startTimer();
            isTimerRunning = true;
        }
    });

    $("#pause").click(function() {
        if (isTimerRunning) {
            pauseTimer();
            isTimerRunning = false;
        }
    });

    $("#stop").click(function() {
        stopTimer();
        isTimerRunning = false;
    });
});