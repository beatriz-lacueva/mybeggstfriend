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
// Contenedor que alberga el botonOnOff y que alterna el estado del interruptor
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
// Botón para iniciar o reiniciar el juego
const start = document.querySelector(".start");
// Audio de fondo del juego
const audio = document.querySelector("audio");
// Instrucciones que aparecen en el modal para mostrar el funcionamiento del juego
const instrucciones = document.querySelector(".instrucciones");




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
 */
botonOnOff.addEventListener("click", () => {
    
    // apagar el juego
    if (onOff.classList.contains("encendido")) {

        onOff.classList.remove("encendido");
        mascota.style.visibility = "hidden";
        modal.style.visibility = "visible";
        instrucciones.style.visibility = "visible";
        start.style.visibility = "visible";
        audio.pause();

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

/**
 * Evento que detecta el cambio en la visibilidad de la página.
 * Este evento se dispara cuando el estado de visibilidad de la página cambia (por ejemplo, cuando el usuario minimiza la ventana o la bloquea en un dispositivo móvil).
 * Si la página se vuelve invisible, se pausa el audio. Si la página se vuelve visible y el juego está encendido, se reproduce el audio, siempre y cuando el modal no esté activo.
 * @event visibilitychange
 */
document.addEventListener('visibilitychange', function() {

    if (document.hidden) {

        // Si la página se vuelve invisible (como cuando el móvil se apaga o se bloquea), detener el audio
        audio.pause();

    }else{
    // Verificar si el juego está encendido
    if (onOff.classList.contains("encendido")) {
        
        audio.play();

    } else {
        audio.pause(); 
    }

    }
});

/**
 * Actualiza el sprite de la mascota según el estado general de las barras.
 * - Triste: Si alguna barra tiene entre 1 y 4 divisiones.
 * - Normal: Si todas las barras tienen entre 5 y 7 divisiones.
 * - Feliz: Si todas las barras tienen entre 8 y 10 divisiones.
 * - Muerto: Si alguna barra tiene 0 divisiones.
 * @return {void} No devuelve ningún valor.
 */
function actualizarSprite() {

    let barraHambre = barrasTimer[0].children.length;
    let barraSueño = barrasTimer[1].children.length;
    let barraAburrimiento = barrasTimer[2].children.length;
    
    //si cualquier barra tiene 0 esta muerto
    if (barraHambre === 0 || barraSueño === 0 || barraAburrimiento === 0) {

        mascota.style.backgroundImage = "url(../img/sprites/sprite_muerto.gif)";

    //si cualquier barra tiene menos de 4 esta triste
    } else if (barraHambre <= 4 || barraSueño <= 4 || barraAburrimiento <= 4) {

        mascota.style.backgroundImage = "url(../img/sprites/sprite_triste.gif)";

    //si cualquier barra tiene entre 5 y 7 esta normal
    } else if (barraHambre >= 5 && barraHambre <= 7 &&
               barraSueño >= 5 && barraSueño <= 7 &&
               barraAburrimiento >= 5 && barraAburrimiento <= 7) {

        mascota.style.backgroundImage = "url(../img/sprites/sprite_normal.gif)";

    //si cualquier barra tiene entre 8 y 10 esta feliz
    } else if (barraHambre >= 8 && barraSueño >= 8 && barraAburrimiento >= 8) {

        mascota.style.backgroundImage = "url(../img/sprites/sprite_feliz.gif)";
        
    }

}

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
                actualizarSprite();

                // Verifica si alguna barra ha llegado a 0
                if (barra.children.length === 0) {

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

        // Después de cada clic en los botones, se actualiza el sprite según el estado general de las barras
        setTimeout(actualizarSprite, 2000);
    });

});
