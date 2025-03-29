
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
            iziToast.show({
                title: 'Error',
                titleColor: '#ffffff',
                message: 'Please choose a date in the future',
                messageColor: '#ffffff',
                color: '#ef4040',
                position: 'topRight'
            });
            return;
        }
        startBtn.disabled = false;
        userSelectDate = +new Date(selectedDates[0]);
    }
});

startBtn.addEventListener("click", handleStart);

function handleStart() {
    startBtn.disabled = true;
    dateInput.disabled = true;
    
    const timerId = setInterval(() => {     
        const currentDate = Date.now();
        const deltaTime = userSelectDate - currentDate;
        if (deltaTime < 0) {
            clearInterval(timerId);
            dateInput.disabled = false;
            return;
        };
        const deadLine = convertMs(deltaTime);
        updateTimer(deadLine, [...timerField]);
    }, 1000);
};

function convertMs(deltaTime) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(deltaTime / day);  
    const hours = Math.floor((deltaTime % day) / hour);
    const minutes = Math.floor(((deltaTime % day) % hour) / minute);
    const seconds = Math.floor((((deltaTime % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

function updateTimer({ days, hours, minutes, seconds }, [fieldDays, fieldHours, fieldMinutes, fieldSeconds]) {
    fieldDays.textContent = String(days).padStart(2, "0");
    fieldHours.textContent = String(hours).padStart(2, "0");
    fieldMinutes.textContent = String(minutes).padStart(2, "0");
    fieldSeconds.textContent = String(seconds).padStart(2, "0");
};