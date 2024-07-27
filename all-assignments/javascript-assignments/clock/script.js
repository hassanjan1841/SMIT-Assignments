function setClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteDeg = minute * 6 + (second / 60) * 6;
  const secondDeg = second * 6;

  document.getElementById(
    "hour"
  ).style.transform = `translate(-100%, -50%) rotate(${hourDeg + 90}deg)`;
  document.getElementById(
    "minute"
  ).style.transform = `translate(-100%, -50%) rotate(${minuteDeg + 90}deg)`;
  document.getElementById(
    "second"
  ).style.transform = `translate(-100%, -50%) rotate(${secondDeg + 90}deg)`;
}

setInterval(setClock, 1000);
setClock(); // To set initial position without delay
