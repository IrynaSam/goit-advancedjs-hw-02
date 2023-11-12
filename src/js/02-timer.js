import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const inputField = document.getElementById('datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let ms = null;
let intervalId = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#eb1d1d',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        iconColor: '#ffffff',
      });
      return;
    }
    startBtn.removeAttribute('disabled');
    ms = selectedDates[0].getTime();
  },
};

startBtn.addEventListener('click', onClickHandler);

function onClickHandler() {
  startBtn.setAttribute('disabled', 'true');
  inputField.setAttribute('disabled', 'true');
  intervalId = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeMs = ms - currentDate;
    if (timeMs <= 0) {
      clearInterval(intervalId);
      inputField.removeAttribute('disabled');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeMs);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);
  }, 1000);
}

flatpickr(inputField, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
