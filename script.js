const svgBack = document.getElementById("timer-control-button-back");
const svgForrward = document.getElementById("timer-control-button-forward");
let minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");


let minutosIncre = 25;
let segundosIncre = 0;


svgBack.addEventListener("click", () => {


    if (minutos) {

        if (segundosIncre === 0) {
        }

        setInterval(() => {
            if (segundosIncre === 0) {
                if (minutosIncre === 0) return
                minutosIncre--;
                segundosIncre = 59;
            } else {
                segundosIncre--;
            }

            segundos.textContent = segundosIncre.toString().padStart(2, "0");
            minutos.textContent = minutosIncre.toString().padStart(2, "0");

        }, 1000)
    }

    console.log(minutosIncre)
});

svgForrward.addEventListener("click", () => {
    console.log("OK")
})