function countdownToBirthday(birthday) {
  const now = new Date();
  let nextBirthday = new Date(birthday);

  nextBirthday.setFullYear(now.getFullYear());

  if (now > nextBirthday) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const timeDiff = nextBirthday - now;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

function startCountdown() {
  const birthdayInput = document.getElementById("birthday-input").value;
  if (birthdayInput) {
    document.getElementById("countdown").classList.remove("hidden");
    countdownToBirthday(birthdayInput);

    setInterval(() => {
      countdownToBirthday(birthdayInput);
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start-button")
    .addEventListener("click", startCountdown);
});
