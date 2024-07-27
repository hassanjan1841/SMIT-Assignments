let countdownDisplay = document.getElementById("countdown");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let userInput = document.getElementById("userNumber");
let startRangeInput = document.getElementById("startRange");
let endRangeInput = document.getElementById("endRange");
let resultDisplay = document.getElementById("result");

let countdown = 0;
let countdownInterval;
let startRange = 0;
let endRange = 1000;

function setRange() {
  if (startRangeInput.value && endRangeInput.value) {
    startRange = parseInt(startRangeInput.value);
    endRange = parseInt(endRangeInput.value);
    // closeModal();
    showNotification("Range has been set!", "#4CAF50");
    playSuccessNotify();
  } else {
    showNotification("Sorry, Please Enter Something!", "#FF0000");
    playFailedNotify();
  }
}

// Define sound effect audio elements
const startSound = new Audio("./soundeffects/start.mp3");
const stopSound = new Audio("./soundeffects/stop.mp3");
const winSound = new Audio("./soundeffects/win.mp3");
const loseSound = new Audio("./soundeffects/lose.mp3");
const failedNotify = new Audio("./soundeffects/error_notification.mp3");
const successNotify = new Audio("./soundeffects/success_notification.mp3");

// Play sound effect functions
function playFailedNotify() {
  failedNotify.play();
}
function playSuccessNotify() {
  successNotify.play();
}
function playStartSound() {
  startSound.play();
}

function playStopSound() {
  stopSound.play();
}

function playWinSound() {
  winSound.play();
}

function playLoseSound() {
  loseSound.play();
}
function resetAudio() {
  startSound.pause();
  startSound.currentTime = 0;
  stopSound.pause();
  stopSound.currentTime = 0;
  winSound.pause();
  winSound.currentTime = 0;
  loseSound.pause();
  loseSound.currentTime = 0;
}

// Adjusted start function with sound effects
function start() {
  if (userInput.value && startRange < endRange) {
    countdown = startRange;
    countdownDisplay.innerText = countdown;
    countdownInterval = setInterval(() => {
      if (countdown >= endRange) {
        clearInterval(countdownInterval);
        resultDisplay.innerText = "You are late!";
        startButton.disabled = false;
        stopButton.disabled = true;
        playLoseSound(); // Play lose sound
      } else {
        countdown++;
        countdownDisplay.innerText = countdown;
      }
    }, 10);
    startButton.disabled = true;
    stopButton.disabled = false;
    playStartSound(); // Play start sound
  } else {
    showModal("Please enter a number and set the range!", "#FF0000");
    playLoseSound(); // Play lose sound
  }
}

// Adjusted stop function with sound effects
function stop() {
  clearInterval(countdownInterval);
  if (userInput.value == countdown) {
    showModal("You Win!", "#4CAF50");
    playWinSound(); // Play win sound
  } else {
    showModal("You Lose!", "#FF0000");
    playLoseSound(); // Play lose sound
  }
  countdown = startRange;
  countdownDisplay.innerText = startRange;
  startButton.disabled = false;
  stopButton.disabled = true;
  playStopSound(); // Play stop sound
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function showModal(message, color) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = "flex";
  modal.firstElementChild.style.backgroundColor = color;
  modal.firstElementChild.style.color = "white";
  modal.firstElementChild.style.fontSize = "1.3rem";
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.animation = "fadeOut 0.5s forwards";
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 500);
}

function showNotification(message, color) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.backgroundColor = color;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOut 1s forwards";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1000);
  }, 1000);
}
