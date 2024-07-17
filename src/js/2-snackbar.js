import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
//---------------------------------------------------
const click = document.querySelector(".form")
click.addEventListener("submit", hendlerSubmit)


function hendlerSubmit(evt) {
    evt.preventDefault()
    const delay = parseInt(evt.target.delay.value)
    const state = evt.target.state.value

    createProm(delay, state)
    .then(delay => { iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`
    });
    })
     .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`
      });
    });
}

function createProm(timing, radio) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio === "fulfilled") {
                resolve(timing)
            }
            else  {
                reject(timing)
            }
        }, timing)
    })
}