/*------------------------------------*\
* index.js
*  Interacciones:
*  - El usuario puede encender o apagar el juego con un botón.
*  - Los botones permiten alimentar, hacer dormir y jugar con la mascota.
*  - Las barras de estado se vacían con el tiempo y se rellenan con clicKs.
*  Estructura:
*  - Constantes
*  - Variables
*  - Funciones
*------------------------------------*/


const onOff = document.querySelector(".onOff");
// Botón que alterna el estado del interruptor
const botonOnOff = document.querySelector(".botonOnOff");
// Representación visual de la mascota
const mascota = document.querySelector(".mascota");
// Ventana modal que aparece cuando empieza y termina el juego
const modal = document.querySelector(".modal");
// Indicadores visuales de estados (hambre, sueño, aburrimiento)
const barrasTimer = document.querySelectorAll(".barra");
// Botones para interactuar con los estados
const botones = document.querySelectorAll(".boton");
const start = document.querySelector(".start");
const audio = document.querySelector("audio");
const instrucciones = document.querySelector(".modalBotones");



// inicia el juego con 10 divisiones cada barra
barrasTimer.forEach((barra) => {
    for (let i = 0; i < 10; i++) {
        const division = document.createElement("div");
        division.classList.add("divisiones");
        barra.appendChild(division);
    }
});


/**
 * Evento que enciende o apaga el juego cuando se hace clic en el botón principal.
 * @event click
 * @param {Event} 
 * @return {undefined} No tiene ningun return.
 * @see {@link } 
 */
botonOnOff.addEventListener("click", () => {
    
    // apagar el juego
    if (onOff.classList.contains("encendido")) {

        onOff.classList.remove("encendido");
        mascota.style.visibility = "hidden";
        modal.style.visibility = "visible";
        instrucciones.style.visibility = "visible";
        start.style.visibility = "visible";

    // encender el juego                                                        
    } else {

        onOff.classList.add("encendido");
        mascota.style.visibility = "visible";
        modal.style.visibility = "hidden";
        start.style.visibility = "hidden";
        audio.play();
        audio.currentTime = 0;
        instrucciones.style.visibility = "hidden";
        start.style.visibility = "hidden";


        // cada vez que reinicia el juego estan las barras llenas
        barrasTimer.forEach((barra) => {

            while (barra.children.length < 10) {

                const division = document.createElement("div");
                division.classList.add("divisiones");
                barra.appendChild(division);

            }

        });

        // llamamos a la función jugar para iniciar el temporizador
        jugar();

    }
});

document.addEventListener('visibilitychange', function() {

    if (document.hidden) {

        // Si la página se vuelve invisible (como cuando el móvil se apaga o se bloquea), detener el audio
        audio.pause();

    }else{
    // Verificar si el juego está encendido
    if (onOff.classList.contains("encendido")) {
        // Reproducir el audio solo si el juego está encendido y el modal no está visible
        audio.play();

    } else {
        audio.pause(); // Si el juego está apagado o el modal está visible, pausarlo
    }

    }
});

// Variable para guardar los temporalizadores de las barras y que no vaya aumentando la velocidad cada vez que el juego empieza
let timers = [];

/**
 * Vacía las barras gradualmente y actualiza el estado de la mascota.
 * Detiene el juego si todas las barras están vacías.
 * @return {void} No devuelve ningún valor.
 */
function jugar() {

    // el primer sprite que sale al iniciar el juego es el sprite feliz, ya que sus barras están llenas
    mascota.style.backgroundImage = "url(../img/sprites/sprite_feliz.gif)";
    // parar temporalizador anterior
    timers.forEach(timer => clearInterval(timer));
    // array vacio para guardar temporalizador nuevo
    timers = [];

    barrasTimer.forEach(barra => {

        let timer = setInterval(() => {

            if (barra.children.length > 0) {

                // elimina barrita
                barra.removeChild(barra.lastElementChild);

                // limpia las barras cuando el juego este apagado
                if (modal.style.visibility === "visible"){
                    instrucciones.style.visibility = "visible";
                start.style.visibility = "visible";
                    barra.innerHTML = "";
                    audio.pause();
                }

                // actualiza sprites
                if (barra.children.length >= 8) {
                    c
                } else if (barra.children.length >= 4) {
                    mascota.style.backgroundImage = "url(../img/sprites/sprite_normal.gif)"; // Mascota normal
                } else if (barra.children.length >= 1) {
                    mascota.style.backgroundImage = "url(../img/sprites/sprite_triste.gif)"; // Mascota triste
                } else if (barra.children.length === 0) {
                    mascota.style.backgroundImage = "url(../img/sprites/sprite_muerto.gif)"; // Mascota muerta
                    clearInterval(timer);
                    modal.style.visibility = "visible";
                    onOff.classList.remove("encendido");
                }
                
            }

        }, 700);

        // guardar temporalizador de ese momento
        timers.push(timer);

    });

}


botones.forEach((boton, i) => {

    /**
     * Evento que agrega divisiones a las barras de estado al hacer clic en los botones.
     * @event click
     * @param {Event} 
     * @return {undefined} No tiene ningun return.
     * @see {@link } 
     */
    boton.addEventListener("click", () => {

        // cada barra tiene su boton respectivo
        const barra = barrasTimer[i];

        // añadir divisiones si son menos de 10
        if (barra.children.length < 10) {

            const division = document.createElement("div");
            division.classList.add("divisiones");
            barra.appendChild(division);

        }

        // cambiar el sprite segun el botón que se clickea
        if (boton === botones[0]) {
            mascota.style.backgroundImage = "url(../img/sprites/sprite_comer.gif)";
        } else if (boton === botones[1]) {
            mascota.style.backgroundImage = "url(../img/sprites/sprite_dormir.gif)";
        } else if (boton === botones[2]) {
            mascota.style.backgroundImage = "url(../img/sprites/sprite_jugar.gif)";
        }

    });

});