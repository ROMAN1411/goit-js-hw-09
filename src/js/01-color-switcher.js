
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;
stopBtn.setAttribute('disabled', true);

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', true);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled', true);
    stopBtn.setAttribute('disabled', true);
    });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}