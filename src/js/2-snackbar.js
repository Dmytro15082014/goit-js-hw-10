
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

const formSnackbar = document.querySelector(".form");
const inputDelay = formSnackbar.elements.delay;
const stateInput = formSnackbar.elements.state;

formSnackbar.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const delay = inputDelay.value;
    const state = stateInput.value;
    formSnackbar.reset()
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);

            }
        }, delay);
    });
    promise
        .then(value => iziToast.show({
            title: "OK",
            titleColor: "#fff",
            message: value,
            messageColor: "#fff",
            color: "#59a10d",
            position: "topRight",
        }))
        .catch(error => iziToast.show({
            title: "ERROR",
            titleColor: "#fff",
            message: error,
            messageColor: "#fff",
            color: "#ef4040",
            position: "topRight",
        }));
};