// Aparece una imagen en pantalla
// inicia el tiempo regresivo = a tiempoElección
// si tiempoElección llega a 0 Jugador 1 y 2 pierden
// el sistema revisa cada 100ms si jugador 1 presiono "q" o "w" o "e" y si jugador 2 presiono "arrowLwft" o "arrowDown" o "arrowRigth"
// si jugador 1 y jugador 2 seleccionaron alguna tecla indicada el sistema revisa si jugador 1 y jugador 2 acertaron
// si el jugador 1 no acerto el sistema indica que peridio el jugador 1
// si el jugador 2 no acerto elsistama indica que perdio jugador 2
// si ninguno acierta el sistema indica que ambos jugadores perdieron
// si ambos jugadores aciertan tiempoelección se multipica por 0.95, puntos++ y se inicia el juego nuevamente 

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

let jaja = new Audio('./Sound/jaja.mp3');
let pop = new Audio('./Sound/pop.mp3');

let vidaRestante = 100;
vida.style.width = `${vidaRestante}%`;

let juegoActivo = true
let tiempo = 3000
let jugador1 = null
let jugador2 = null
let revisando

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


window.addEventListener('keydown', seleccionarTeclado)

btnVolver.addEventListener('click', cerrar);



btnOveja.addEventListener('click', () => {
    pop.play();
    jugador1 = 'oveja'
});

btnVaca.addEventListener('click', () => {
  pop.play();
  jugador1 = 'vaca'
});

btnPollo.addEventListener('click', () => {
  pop.play();
  jugador1 = 'pollo'
});

btnOveja2.addEventListener('click', () => {
  pop.play();
  jugador2 = 'oveja'
});

btnVaca2.addEventListener('click', () => {
pop.play();
jugador2 = 'vaca'
});

btnPollo2.addEventListener('click', () => {
pop.play();
jugador2 = 'pollo'
});

/// touch

/* btnOveja.addEventListener('touchstart', () => {
  pop.play();
  jugador1 = 'oveja'
});

btnVaca.addEventListener('touchstart', () => {
pop.play();
jugador1 = 'vaca'
});

btnPollo.addEventListener('touchstart', () => {
pop.play();
jugador1 = 'pollo'
});

btnOveja2.addEventListener('touchstart', () => {
pop.play();
jugador2 = 'oveja'
});

btnVaca2.addEventListener('touchstart', () => {
pop.play();
jugador2 = 'vaca'
});

btnPollo2.addEventListener('touchstart', () => {
pop.play();
jugador2 = 'pollo'
}); */


function seleccionarTeclado(evento){
  switch(evento.key){
    case 'q':
      btnOveja.click()
      break
    
    case "w" :
      btnVaca.click()
      break

    case "e":
      btnPollo.click()
      break

    case 'ArrowLeft':
      btnOveja2.click()
      break
    
    case "ArrowDown" :
      btnVaca2.click()
      break

    case "ArrowRight":
      btnPollo2.click()
      break
  }
}

function mostrarImagen(){
  const imagenElement = document.querySelector(".display img");
  imagenElement.src = "./IMG/pregunta.png";
  imageName = 'pregunta';

  setTimeout(
    ()=>{
      const randomIndex = Math.floor(Math.random() * imagenes.length);
        imagenElement.src = imagenes[randomIndex].url;
        imageName = imagenes[randomIndex].name;
        console.log(imageName);
    },200
  )
}

function seleccionarRespuesta(){
  if(jugador1 && jugador2){
    console.log('selección realizada ') 
    clearInterval(revisando)
    revisarSeleccion();
  }
}



function revisarTiempo(){ // Esta función hace la cuenta de tiempo 

  mostrarImagen()

  console.log(imageName)

  let TiempoInicio = Date.now()

  const decrementoPorIntervalo = (100 / (tiempo / 100));
  
  console.log(TiempoInicio)

  revisando = setInterval( 
    ()=>{
      let tiempoTransurrido =  Date.now() - TiempoInicio

      console.log(tiempoTransurrido)

      console.log(jugador1,jugador2)
      
      vida.style.width = `${vidaRestante}%`;

      vidaRestante -= decrementoPorIntervalo;

      seleccionarRespuesta()

      if(tiempoTransurrido >= tiempo){

        if(imageName === 'bomba'){
          console.log('Era Dr. bomby')
          clearInterval(revisando)
          vidaRestante = 100
          vida.style.width = `${vidaRestante}%`
          revisarTiempo()
        }else{
          if (!jugador1  && !jugador2 ){
            setPRecord.innerHTML = "Ninguno selecciono";
            perdiste()
          }else if(jugador1 && !jugador2){
            setPRecord.innerHTML = "Jugador 2";
            perdiste()
            console.log('jugador 2 no selecciono')
          }else if (!jugador1 && jugador2){
            setPRecord.innerHTML = "Jugador 1";
            perdiste()
            console.log('jugador 1 no selecciono')
          }

          clearInterval(revisando)
          juegoActivo = false
        }

      }

    },100
  )
}



function revisarSeleccion(){
  let jugador1Gana = false
  let jugador2Gana = false

  console.log(jugador1 + "ademas de " +jugador2)

  if(jugador1=== imageName){
    jugador1Gana = true
  }

  if(jugador2 === imageName){
    jugador2Gana = true
  }

  if(jugador1Gana && jugador2Gana){
    jugador1Gana = false
    jugador2Gana = false
    jugador1 = null
    jugador2 = null
    tiempo = tiempo*0.95
    vidaRestante = 100
    vida.style.width = `${vidaRestante}%`
    iniciarJuego()
  }else if(jugador1Gana && !jugador2Gana){
    juegoActivo = false
    setPRecord.innerHTML = "Jugador 2";
    perdiste()
    console.log('Jugador 2 pierde')
    
  }else if(!jugador1Gana && jugador2Gana){
    juegoActivo = false
    setPRecord.innerHTML = "Jugador ";
    perdiste()
  }else{
    juegoActivo = false
    setPRecord.innerHTML = "Ambos perdieron";
    perdiste()
  }
}



function iniciarJuego(){

  jugador1 = null
  jugador2 = null
  
  if(juegoActivo){
    console.log("mostrado imagen")
    revisarTiempo()
  }else{
    console.log('juego parado')
  }
}

function perdiste() {
  jaja.play();
  perdisteSection.classList.remove('oculto'); 
}

function cerrar() {
  perdisteSection.classList.add('oculto');
  tiempo = 3000
  jugador1 = null
  jugador2 = null
  juegoActivo = true
  clearInterval(revisando)
  vidaRestante = 100
  vida.style.width = `${vidaRestante}%`
  iniciarJuego()
}

iniciarJuego();