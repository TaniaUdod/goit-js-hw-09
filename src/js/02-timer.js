import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const date = document.querySelector('#datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let intervalId = null;

flatpickr (date, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Report.failure("Please choose a date in the future");
            btnStart.disabled = true;
        } else {
            Notiflix.Report.success("Let's go")
            btnStart.disabled = false;
        }
    },
});

btnStart.addEventListener('click', onStart);

function onStart() {
    date.disabled = true;
    btnStart.disabled = true;

    intervalId = setInterval(() => {
        const choosenDate = new Date(date.value);
        const currentDate = Date.now();
        const timeDifference = choosenDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        
        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
        
        if (timeDifference < 1000) {
            clearInterval(intervalId);
            date.disabled = false;
        }
    }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero (value) {
    return String(value).padStart(2, '0');
}