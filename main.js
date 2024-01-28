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


btnVolver.addEventListener('click', cerrar);

function cerrar() {
    perdisteSection.classList.add('oculto');
    cambiarImagenAleatoria()
}

function iniciarJuego() {
    cambiarImagenAleatoria();

    // Event listeners para los botones
    btnOveja.addEventListener('click', function () {
        VerificarImagen(btnOveja.id);
    });

    btnVaca.addEventListener('click', function () {
        VerificarImagen(btnVaca.id);
    });

    btnPollo.addEventListener('click', function () {
        VerificarImagen(btnPollo.id);
    });
}

function cambiarImagenAleatoria() {
    reiniciarIntervalo(); // Reiniciar el intervalo antes de cambiar la imagen
    const randomIndex = Math.floor(Math.random() * imagenes.length);
    const imagenElement = document.querySelector(".display img");
    imagenElement.src = imagenes[randomIndex].url;
    imageName = imagenes[randomIndex].name;
    console.log(imageName);

    // Establecer un nuevo intervalo después de cambiar la imagen
    intervalId = setInterval(function () {
        cambiarImagenAleatoria();
    }, tiempoEleccion);
}

function VerificarImagen(id) {
    reiniciarIntervalo(); // Reiniciar el intervalo al seleccionar una opción correcta
    if (id == imageName) {
        puntos++;
        setPuntos.innerHTML=puntos
        console.log('Respuesta correcta! Puntos: ' + puntos);
        tiempoEleccion = tiempoEleccion * 0.9
        cambiarImagenAleatoria();
    } else {
        perdiste();
    }
}

function reiniciarIntervalo() {
    clearInterval(intervalId); // Detener el intervalo actual
}

iniciarJuego();

function perdiste(){
    console.log("perdiste")
    setPuntos.innerHTML= 0
    setPRecord.innerHTML = puntos
    perdisteSection.classList.remove('oculto')
}
