const btnVolver = document.querySelector('#volver');

const btnOveja = document.querySelector('#oveja');
const btnVaca = document.querySelector('#vaca');
const btnPollo = document.querySelector('#pollo');

const btnOveja2 = document.querySelector('#oveja2');
const btnVaca2 = document.querySelector('#vaca2');
const btnPollo2 = document.querySelector('#pollo2');

const setPuntos = document.querySelector('#puntos');
const setPRecord = document.querySelector('#record');
const perdisteSection = document.querySelector('#perdiste');

const vida = document.querySelector('#Vida');
let vidaRestante = 100;
vida.style.width = `${vidaRestante}%`;

let puntos = 0;
let tiempoEleccion = 3000; // 3 segundos para elegir por defecto
let imageName;
let intervalId; // Variable para almacenar el ID del intervalo
let juegoActivo = true;
let botonPerdido;
let seleccion = []


let jaja = new Audio('./Sound/jaja.mp3');
let pop = new Audio('./Sound/pop.mp3');

// Event listeners para los botones

window.addEventListener('keydown', moveKeyBoard);


btnVolver.addEventListener('click', cerrar);

btnOveja.addEventListener('click', () => {
    pop.play();
    VerificarImagen(btnOveja.id);
});

btnVaca.addEventListener('click', () =>{
    pop.play();
    VerificarImagen(btnVaca.id);
});

btnPollo.addEventListener('click', () =>{
    pop.play();
    VerificarImagen(btnPollo.id);
        });

btnOveja2.addEventListener('click', function () {
    pop.play()
    VerificarImagen(btnOveja2.id);
});

btnVaca2.addEventListener('click', function () {
    pop.play()
    VerificarImagen(btnVaca2.id);
});

btnPollo2.addEventListener('click', function () {
    pop.play()
    VerificarImagen(btnPollo2.id);
})

const imagenes = [
    {
        url: "./IMG/bomba.png",
        name: 'bomba'
    },
    {
        url: "./IMG/vaca.png",
        name: 'vaca'
    },
    {
        url: "./IMG/oveja.png",
        name: 'oveja'
    },
    {
        url: "./IMG/pollo.png",
        name: 'pollo'
    },
];



function cerrar() {
    perdisteSection.classList.add('oculto');
    setPRecord.innerHTML = "0";
    puntos = 0;
    tiempoEleccion = 3000;
    juegoActivo = true
    cambiarImagenAleatoria();
}

function iniciarJuego() {
    cambiarImagenAleatoria();   
}

function cambiarImagenAleatoria() {

    if(juegoActivo){
        // Mostrar la imagen de pregunta antes de cambiar a una imagen aleatoria
    const imagenElement = document.querySelector(".display img");
    imagenElement.src = "./IMG/pregunta.png";
    imageName = 'pregunta';  // Asignar un nombre que identifique la imagen de pregunta
    
    // Establecer un temporizador para cambiar a una imagen aleatoria después de 0.2 segundos
    setTimeout( () => {
        reiniciarIntervalo(); // Reiniciar el intervalo antes de cambiar la imagen
        const randomIndex = Math.floor(Math.random() * imagenes.length);
        imagenElement.src = imagenes[randomIndex].url;
        imageName = imagenes[randomIndex].name;
        console.log(imageName);

        vidaRestante = 100;
        vida.style.width = `${vidaRestante}%`;
        let tiempoInicio = Date.now(); // Obtener el tiempo actual

        quitarVida();

        // Establecer un nuevo intervalo después de cambiar la imagen aleatoria
        intervalId = setInterval(function () {
            let tiempoActual = Date.now();
            let tiempoTranscurrido = tiempoActual - tiempoInicio;

            if (tiempoTranscurrido >= tiempoEleccion) {
                // Si ha pasado el tiempo de espera y no se ha seleccionado nada
                if (imageName === 'bomba') {
                    cambiarImagenAleatoria();
                } else {
                    // Si la imagen no es la bomba, el usuario pierde
                    perdiste();
                }
                // Reiniciar el tiempo de inicio
                tiempoInicio = Date.now();

                // Llamar a la función quitarVida() para reiniciar la vida
                
            }

        }, 100); // Verificar cada 100 milisegundos (ajustar según sea necesario)
    }, 200);
    }
    
    
}

function VerificarImagen(id) {
    reiniciarIntervalo(); // Reiniciar el intervalo al seleccionar una opción correcta
   
    const idOriginal = id;
    id = id.endsWith('2') ? id.slice(0, -1) : id;
    
    if (id == imageName) {
        puntos++;
        setPuntos.innerHTML = puntos;
        console.log('Respuesta correcta! Puntos: ' + puntos);
        tiempoEleccion = tiempoEleccion * 0.95;
        cambiarImagenAleatoria();
    } else {
        botonPerdido = idOriginal;
        perdiste();
    }
}

function reiniciarIntervalo() {
    clearInterval(intervalId); // Detener el intervalo actual
}

function perdiste() {
    jaja.play();
    console.log("perdiste");
    // Verificar si botonPerdido termina en 2
    if (botonPerdido && botonPerdido.endsWith('2')) {
        setPRecord.innerHTML = "jugador 2";
    } else {
        setPRecord.innerHTML = "jugador 1";
    }
    setPuntos.innerHTML = 0;
    perdisteSection.classList.remove('oculto');
    juegoActivo = false  
    botonPerdido = undefined;  
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function quitarVida() {
    const intervalo = 100; // Intervalo de tiempo para actualizar el porcentaje (en milisegundos)

    const decrementoPorIntervalo = (100 / (tiempoEleccion / 100)); // Decremento por cada intervalo

    const intervalId = setInterval(() => {
        if (vidaRestante > 0) {
            // Actualiza visualmente el ancho del elemento
            vida.style.width = `${vidaRestante}%`;

            // Realiza el decremento
            vidaRestante -= decrementoPorIntervalo;

            // Muestra el valor actual de vidaRestante
            console.log(vidaRestante);
        } else {
            // Si vidaRestante llega a 0 o menos, detén el intervalo
            clearInterval(intervalId);
        }
    }, intervalo);

    // Espera tiempoEleccion segundos antes de detener el intervalo
    await delay(tiempoEleccion);

    // Detén el intervalo después de tiempoEleccion segundos
    clearInterval(intervalId);
}

function moveKeyBoard(key){
    
    console.log(key.key)

    switch (key.key){

        
        case 'ArrowLeft':
            btnOveja2.click();
            break;

        case 'ArrowDown':
            btnVaca2.click();
            break;

        case 'ArrowRight':
            btnPollo2.click();
            break;

        case 'q':
            btnOveja.click();
            break;

        case 'w':
            btnVaca.click();
            break;

        case 'e':
            btnPollo.click();
            break;
    }
}

iniciarJuego();