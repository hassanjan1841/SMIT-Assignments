const guessNumberContent = document.querySelector(".guess-number");
const liveCounter = document.querySelector(".live-counter");
const liveContainer = document.querySelector(".lives");
const tryAgainBtn = document.querySelector(".try-again");

const modalContainer = document.querySelector(".error-modal");
const modalContent = document.querySelector(".modal-content h2");

const userNumber = document.querySelector("#userNumber");
const checkBtn = document.querySelector(".check");

const startContainer = document.querySelector(".start-container");
const startBtn = document.querySelector(".start-btn");

const gameContainer = document.querySelector(".game-container");
const userContainer = document.querySelector(".user-container");
const computerContainer = document.querySelector(".computer-container");

const resultContainer = document.querySelector(".result-container");
const resultText = document.querySelector(".result-text");

function startGame() {
  startContainer.style.display = "none";
  gameContainer.style.display = "flex";
}

tryAgainBtn.style.display = "none";

let counter = 10;
function showLives(counter) {
  liveCounter.innerHTML = "";
  for (let i = 0; i < counter; i++) {
    liveCounter.innerHTML += '<img src="./heart.webp" alt="" />';
  }
}
showLives(counter);

let winCount = 0;
function guessNumber() {
  if (userNumber.value === "") {
    modalContainer.style.display = "flex";
    modalContent.innerHTML = "Please enter a number!";
  }
  if (userNumber.value !== "") {
    let randomNumber = Math.floor(Math.random() * 10) + 1;

    guessNumberContent.innerHTML = "";
    guessNumberContent.innerHTML = randomNumber;

    if (userNumber.value == randomNumber) {
      winCount++;
    }
    //   liveCounter.innerHTML = counter;
    if (userNumber.value < 1 || userNumber.value > 10) {
      modalContainer.style.display = "flex";
      modalContent.innerHTML = "Please enter a number between 1 and 10!";
    } else {
      counter--;
    }
    showLives(counter);

    if (counter === 0 && winCount === 3) {
      resultContainer.style.display = "flex";
      resultText.innerHTML = "YOU WIN!";
      resultText.style.color = "green";
      userContainer.style.display = "none";
      computerContainer.style.display = "none";
      liveContainer.style.display = "none";
    } else if (counter === 0 && winCount < 3) {
      resultContainer.style.display = "flex";
      resultText.innerHTML = "YOU LOOSE";
      resultText.style.color = "red";
      tryAgainBtn.style.display = "inline-block";
      tryAgainBtn.classList.add("primary-btn");
      userContainer.style.display = "none";
      computerContainer.style.display = "none";
      liveContainer.style.display = "none";
    }
  }
}
function tryAgain() {
  counter = 10;
  liveCounter.innerHTML = "";
  showLives(counter);
  winCount = 0;
  userContainer.style.display = "flex";
  computerContainer.style.display = "block";
  guessNumberContent.innerHTML = "";
  tryAgainBtn.style.display = "none";
  resultText.innerHTML = "";
  liveContainer.style.display = "flex";
}
function closeModal() {
  modalContainer.style.display = "none";
}
