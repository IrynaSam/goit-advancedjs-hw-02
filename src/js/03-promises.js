import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  const amountValue = form.elements.amount.value;
  const stepValue = form.elements.step.value;
  const delayValue = form.elements.delay.value;

  let delay = Number(delayValue);

  for (let i = 1; i <= Number(amountValue); i++) {
    createPromise(i, delay).then(onResolve, onReject).catch(console.log);
    delay += Number(stepValue);
  }
  form.reset();
}

function onResolve({ position, delay }) {
  iziToast.success({
    message: `Fulfilled promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}
function onReject({ position, delay }) {
  iziToast.error({
    message: `Rejected promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
