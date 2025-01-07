/*------------------------------------*\
* index.js
*  Interacciones:
*  - El usuario puede encender o apagar el juego con un botón.
*  - Los botones permiten alimentar, hacer dormir y jugar con la mascota.
*  - Las barras de estado se vacían con el tiempo y se rellenan con clicKs.
*  Datos:
*  - ????
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
    
    // Apagar el juego
    if (onOff.classList.contains("encendido")) {

        onOff.classList.remove("encendido");
        mascota.style.visibility = "hidden";
        modal.style.visibility = "visible";                         

    // Encender el juego                                                        
    } else {

        onOff.classList.add("encendido");
        mascota.style.visibility = "visible";
        modal.style.visibility = "hidden";

        // cada vez que reinicia el juego estan las barras llenas
        barrasTimer.forEach((barra) => {

            while (barra.children.length < 10) {

                const division = document.createElement("div");
                division.classList.add("divisiones");
                barra.appendChild(division);

            }

        });

        // Llamamos a la función jugar para iniciar el temporizador
        jugar();

    }
});

/**
 * Vacía las barras gradualmente y actualiza el estado de la mascota.
 * Detiene el juego si todas las barras están vacías.
 * @return {void} No devuelve ningún valor.
 */
function jugar() {

    barrasTimer.forEach(barra => {

        let timer = setInterval(() => {

            if (barra.children.length > 0) {

                // elimina barrita
                barra.removeChild(barra.lastElementChild);

                // limpia las barras cuando el juego este apagado
                if (modal.style.visibility === "visible"){
                    barra.innerHTML = "";
                }

                // actualiza sprites
                if (barra.children.length >= 8) {
                    mascota.style.backgroundImage = "url(../img/sprites/sprite_feliz.gif)"; // Mascota feliz
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

        // cada barra se asocia al botón presionado
        const barra = barrasTimer[i];

        // añadir divisiones siempre que sean 10 o menos
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
