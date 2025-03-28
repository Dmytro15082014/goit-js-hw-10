
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector(".btn-start");
const timerField = document.querySelectorAll(".value");

startBtn.disabled = true;

let userSelectDate = 0;
flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        if (selectedDates[0] <= currentDate) {
            alert("Please choose a date in the future");
            return
        }
        startBtn.disabled = false;
        userSelectDate = +new Date(selectedDates[0]);
    }
});

startBtn.addEventListener("click", handleStart);

function handleStart() {
    startBtn.disabled = true;
    dateInput.disabled = true;
    
    const timer = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = userSelectDate - currentDate;
        const deadLine = convertMs(deltaTime);
        initTimer(deadLine);
    }, 1000);

}

function convertMs(deltaTime) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(deltaTime / day);
  
    const hours = Math.floor((deltaTime % day) / hour);
    const minutes = Math.floor(((deltaTime % day) % hour) / minute);
    const seconds = Math.floor((((deltaTime % day) % hour) % minute) / second);
    console.log({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
}

function initTimer({ days, hours, minutes, seconds }) {
    const fields = [...timerField];
    fields[0].textContent = days;
    fields[1].textContent = hours;
    fields[2].textContent = minutes;
    fields[3].textContent = seconds;
}