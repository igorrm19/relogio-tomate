
const svgBack = document.getElementById("timer-control-button-back");
const svgForrward = document.getElementById("timer-control-button-forward");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const pause = document.getElementById("pause");
const parar = document.getElementById("parar");
const history = document.getElementById("historico");
const con11 = document.getElementById("container1.1");
const con12 = document.getElementById("container1.2");
const con21 = document.getElementById("container2.1");
const con31 = document.getElementById("container3.1");
const segundos2 = document.getElementById("segundos2");
const minutos2 = document.getElementById("minutos2");
const historyContainer = document.getElementById("history-container");

const Play = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style="color: crimson;" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
</svg>`;

const Pause = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style="color: crimson;"
                            fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                        </svg>`;



function Plays() {
    pause.style.display = "block";
    parar.style.display = "none";
    history.style.display = "none";

    con11.style.display = "block";
    con12.style.display = "flex";

    con21.style.display = "none";

    con31.style.display = "none";

}


function Parar() {
    parar.style.display = "block";
    pause.style.display = "none";
    history.style.display = "none";

    con21.style.display = "flex";

    con11.style.display = "none";
    con12.style.display = "none";

    con31.style.display = "none";
}


function History() {
    loadHistory();

    history.style.display = "block";
    parar.style.display = "none";
    pause.style.display = "none";

    con31.style.display = "flex";

    con11.style.display = "none";
    con12.style.display = "none";

    con21.style.display = "none";

}

let arrayDisplay = [Plays, Parar, History];



let ObjTime = {
    minutos: 1,
    segundos: 0,
    interval: null,
    controllrs: true
}


let ObjTime2 = {
    minutos: 5,
    segundos: 0,
    interval: null,
    controllrs: true
}

let ObjSVG = {
    play: Play,
    pause: Pause
}


function addCompletedSession() {
    const tomatoEmoji = document.createElement("span");
    tomatoEmoji.textContent = "🍅";
    tomatoEmoji.style.fontSize = "2rem";
    tomatoEmoji.style.margin = "5px";
    historyContainer.appendChild(tomatoEmoji);
    
    const sessionCount = getSessionCount() + 1;
    localStorage.setItem("pomodoroSessions", sessionCount.toString());
    
    const tomatoes = getTomatoes();
    tomatoes.push(Date.now());
    localStorage.setItem("pomodoroTomatoes", JSON.stringify(tomatoes));
}

function getSessionCount() {
    const count = localStorage.getItem("pomodoroSessions");
    return count ? parseInt(count, 10) : 0;
}

function getTomatoes() {
    const tomatoes = localStorage.getItem("pomodoroTomatoes");
    return tomatoes ? JSON.parse(tomatoes) : [];
}

function loadHistory() {
    const tomatoes = getTomatoes();
    historyContainer.innerHTML = "";
    tomatoes.forEach(() => {
        const tomatoEmoji = document.createElement("span");
        tomatoEmoji.textContent = "🍅";
        tomatoEmoji.style.fontSize = "2rem";
        tomatoEmoji.style.margin = "5px";
        historyContainer.appendChild(tomatoEmoji);
    });
}

loadHistory();


pause.addEventListener("click", () => {

    if (ObjTime.controllrs) {
        pause.innerHTML = ObjSVG.pause;

        if (!ObjTime.interval) {

            ObjTime.interval = setInterval(() => {
                if (ObjTime.segundos === 0) {
                    if (ObjTime.minutos === 0) {
                        clearInterval(ObjTime.interval);
                        ObjTime.interval = null;
                        addCompletedSession();
                        return;
                    }

                    ObjTime.minutos--;
                    ObjTime.segundos = 59;

                } else {
                    ObjTime.segundos--;
                }

                segundos.textContent = ObjTime.segundos.toString().padStart(2, "0");
                minutos.textContent = ObjTime.minutos.toString().padStart(2, "0");

            }, 1000);

        }


    } else {

        pause.innerHTML = ObjSVG.play;
        clearInterval(ObjTime.interval);
        ObjTime.interval = null;


    }

    ObjTime.controllrs = !ObjTime.controllrs

});


parar.addEventListener("click", () => {

    if (ObjTime2.controllrs) {

        if (!ObjTime2.interval) {
            ObjTime2.interval = setInterval(() => {
                if (ObjTime2.segundos === 0) {
                    if (ObjTime2.minutos === 0) {
                        clearInterval(ObjTime2.interval);
                        ObjTime2.interval = null;
                        return;
                    }
                    ObjTime2.minutos--;
                    ObjTime2.segundos = 59;
                } else {

                    ObjTime2.segundos--;
                }

                segundos2.textContent = ObjTime2.segundos.toString().padStart(2, "0");
                minutos2.textContent = ObjTime2.minutos.toString().padStart(2, "0");

            }, 1000);
        }

    } else {

        clearInterval(ObjTime2.interval);
        ObjTime2.interval = null;
    }

    ObjTime2.controllrs = !ObjTime2.controllrs

}


);

let valor = 0;
svgBack.addEventListener("click", () => {

    valor = (valor + 1) % arrayDisplay.length;
    arrayDisplay[valor]();


});

svgForrward.addEventListener("click", () => {

    valor = (valor - 1 + arrayDisplay.length) % arrayDisplay.length;
    arrayDisplay[valor]();

});