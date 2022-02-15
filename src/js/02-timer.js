import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");

import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: 'center-top',
    distance: '50px',
    timeout: 1250,

});

class Timer {
    constructor({ targetDate }) {
        this.targetDate = targetDate;
        this.timerId = null;
        this.creatingFaceClock();
        this.timerStart();
    }

    convertMs() {
        const time = this.targetDate - Date.now();
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return { time, days, hours, minutes, seconds };
    };

    creatingFaceClock() {
        const faceClock = document.querySelector('.timer');
    
        const dataDays = faceClock.querySelector('[data-days]');
        const dataHours = faceClock.querySelector('[data-hours]');
        const dataMinutes = faceClock.querySelector('[data-minutes]');
        const dataSeconds = faceClock.querySelector('[data-seconds]');

        dataDays.textContent = String(this.convertMs().days).padStart(2, "0");
        dataHours.textContent = String(this.convertMs().hours).padStart(2, "0");
        dataMinutes.textContent = String(this.convertMs().minutes).padStart(2, "0");
        dataSeconds.textContent = String(this.convertMs().seconds).padStart(2, "0");
    };

    timerStart() {
    this.timerId = setInterval(() => {
      const timeLeft = this.targetDate - new Date();
      if (timeLeft <= 1000) {
        clearInterval(this.timerId);
        Notiflix.Notify.info('Time is out');
        startBtn.disabled = false;
      }
        this.creatingFaceClock();
        startBtn.disabled = true;
    }, 1000);
    }
}

let initDate = null;
const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = dateTimePicker.nextElementSibling;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    initDate = selectedDates[0].getTime();
        if (initDate <= options.defaultDate) {
            startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else{
            Notiflix.Notify.success('Press start button');
            startBtn.disabled = false;
        }
    }
};

flatpickr('#datetime-picker', options);

function startTimerHandler() {
  const selectedDate = new Date(initDate);
  new Timer({ targetDate: new Date(selectedDate) });
//   startBtn.disabled = false;
}

startBtn.addEventListener('click', startTimerHandler);




