const btnVolver = document.querySelector('#volver');
const btnOveja = document.querySelector('#oveja');
const btnVaca = document.querySelector('#vaca');
const btnPollo = document.querySelector('#pollo');
const setPuntos = document.querySelector('#puntos')
const setPRecord = document.querySelector('#record')
const perdisteSection = document.querySelector('#perdiste');

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

let puntos = 0;
let tiempoEleccion = 3000; // 3 segundos para elegir por defecto
let imageName;
let intervalId; // Variable para almacenar el ID del intervalo
let juegoActivo = true;

let jaja = new Audio('./Sound/jaja.mp3')
let pop = new Audio('./Sound/pop.mp3')


btnVolver.addEventListener('click', cerrar);

function cerrar() {
    perdisteSection.classList.add('oculto');
    setPRecord.innerHTML = "0"
    juegoActivo = true
    puntos = 0
    cambiarImagenAleatoria()
}

function iniciarJuego() {
    if(juegoActivo){
        cambiarImagenAleatoria();

        // Event listeners para los botones
        btnOveja.addEventListener('click', function () {
            pop.play()
            VerificarImagen(btnOveja.id);
        });
    
        btnVaca.addEventListener('click', function () {
            pop.play()
            VerificarImagen(btnVaca.id);
        });
    
        btnPollo.addEventListener('click', function () {
            pop.play()
            VerificarImagen(btnPollo.id);
        })
    }

}

function cambiarImagenAleatoria() {
    reiniciarIntervalo(); // Reiniciar el intervalo antes de cambiar la imagen

    // Mostrar la imagen de pregunta antes de cambiar a una imagen aleatoria
    const imagenElement = document.querySelector(".display img");
    imagenElement.src = "./IMG/pregunta.png";
    imageName = 'pregunta';  // Asignar un nombre que identifique la imagen de pregunta
    console.log(imageName);

    let tiempoInicio = Date.now(); // Obtener el tiempo actual

    // Establecer un temporizador para cambiar a una imagen aleatoria después de 0.2 segundos
    setTimeout(function () {
        const randomIndex = Math.floor(Math.random() * imagenes.length);
        imagenElement.src = imagenes[randomIndex].url;
        imageName = imagenes[randomIndex].name;
        console.log(imageName);

        // Establecer un nuevo intervalo después de cambiar la imagen aleatoria
        intervalId = setInterval(function () {
            let tiempoActual = Date.now();
            let tiempoTranscurrido = tiempoActual - tiempoInicio;

            if (tiempoTranscurrido >= tiempoEleccion) {
                // Si ha pasado el tiempo de espera y no se ha seleccionado nada
                if (imageName === 'bomba') {
                    // Si la imagen es la bomba, el usuario gana un punto
                    puntos++;
                    setPuntos.innerHTML = puntos;
                    console.log('¡Ganaste un punto! Puntos: ' + puntos);
                } else {
                    // Si la imagen no es la bomba, el usuario pierde
                    perdiste();
                }

                // Cambiar a una nueva imagen aleatoria
                const newRandomIndex = Math.floor(Math.random() * imagenes.length);
                imagenElement.src = imagenes[newRandomIndex].url;
                imageName = imagenes[newRandomIndex].name;
                console.log(imageName);

                // Reiniciar el tiempo de inicio
                tiempoInicio = Date.now();
            }

        }, 100); // Verificar cada 100 milisegundos (ajustar según sea necesario)
    }, 200);
}



function VerificarImagen(id) {
    reiniciarIntervalo(); // Reiniciar el intervalo al seleccionar una opción correcta
    if (id == imageName) {
        puntos++;
        setPuntos.innerHTML=puntos
        console.log('Respuesta correcta! Puntos: ' + puntos);
        tiempoEleccion = tiempoEleccion * 0.95
        cambiarImagenAleatoria();
    } else {
        perdiste();
    }
}

function reiniciarIntervalo() {
    clearInterval(intervalId); // Detener el intervalo actual
}



function perdiste(){
    console.log("perdiste")
    setPuntos.innerHTML= 0
    setPRecord.innerHTML = puntos
    juegoActivo = false
    perdisteSection.classList.remove('oculto')

    jaja.play()
}

iniciarJuego();