import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const timeElements = {
    input: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("button[data-start]"),
    daysTime: document.querySelector("[data-days]"),
    hoursTime: document.querySelector("[data-hours]"),
    minetsTime: document.querySelector("[data-minutes]"),
    secondTime: document.querySelector("[data-seconds]"), 
}

timeElements.startButton.disabled = true

let userSelectedDate = null
let deltaTime = null



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      })
      }
      else {
          timeElements.startButton.disabled = false
          userSelectedDate = selectedDates[0]
      }
      
  },
};



flatpickr(timeElements.input, options)



timeElements.startButton.addEventListener("click", hendlerClick)
function hendlerClick() {
    timeElements.startButton.disabled = true
    timeElements.input.disabled = true
    startCountDown()
}

function startCountDown() {
    let timer = setInterval(() => {
        deltaTime = userSelectedDate - new Date()
        if (deltaTime <= 0) {
            clearInterval(timer)
            timeElements.input.disabled = false
            chengeTime(0, 0, 0, 0)
            return
        } 
        const time = convertMs(deltaTime)
        chengeTime(time.days, time.hours, time.minutes, time.seconds)
    }, 1000);
    
}

function chengeTime(days, hours, minutes, seconds) {
    timeElements.daysTime.textContent = addLeadingZero(days)
    timeElements.hoursTime.textContent = addLeadingZero(hours)
    timeElements.minetsTime.textContent = addLeadingZero(minutes)
    timeElements.secondTime.textContent = addLeadingZero(seconds)
}
    
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


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

