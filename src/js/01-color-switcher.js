const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

btnStop.disabled = true;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onStart() {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    btnStart.disabled = true;
    btnStop.disabled = false;
}

function onStop() {
    clearInterval(intervalId);
    
    btnStart.disabled = false;
    btnStop.disabled = true;
}