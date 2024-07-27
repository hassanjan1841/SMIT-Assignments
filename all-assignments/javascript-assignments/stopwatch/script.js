let timer;
let isRunning = false;
let isPaused = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let pausedTime;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStop").textContent = "Start";
  } else {
    if (isPaused) {
      let currentTime = new Date().getTime();
      let timePaused = (currentTime - pausedTime) / 1000;
      seconds += Math.floor(timePaused);
      isPaused = false;
    }
    timer = setInterval(updateTimer, 1000);
    document.getElementById("startStop").textContent = "Pause";
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("display").textContent = "00:00:00";
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  document.getElementById("display").textContent =
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
