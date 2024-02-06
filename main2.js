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
let seleccion1 = null
let seleccion2 = null
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

const controlesJugador1 = ['q','w','e']
const controlesJugador2 = ['ArrowLeft','ArrowDown','ArrowRight']

window.addEventListener('keydown', seleccionRespuesta)

btnVolver.addEventListener('click', cerrar);


btnOveja.addEventListener('click', () => {
    pop.play();
    jugador1 = 'oveja'
    seleccion1 = 'oveja'
    seleccionarRespuestaTouch()
    jugador1 = null
    seleccion1 = null
});

btnVaca.addEventListener('click', () =>{
  pop.play();
  jugador1 = 'vaca'
  seleccion1 = 'vaca'
  seleccionarRespuestaTouch()
  jugador1 = null
  seleccion1 = null
});

btnPollo.addEventListener('click', () =>{
  pop.play();
  jugador1 = 'pollo'
  seleccion1 = 'pollo'
  seleccionarRespuestaTouch()
  jugador1 = null
  seleccion1 = null
});
btnOveja2.addEventListener('click', function () {
  pop.play();
  jugador2 = 'oveja'
  seleccion2 = 'oveja'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
});
btnVaca2.addEventListener('click', function () {
  pop.play();
  jugador2 = 'vaca'
  seleccion2 = 'vaca'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
});

btnPollo2.addEventListener('click', function () {
  pop.play();
  jugador2 = 'pollo'
  seleccion2 = 'pollo'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
})


/// on touch
btnOveja.addEventListener('touchstart', () => {
    pop.play();
    jugador1 = 'oveja'
    seleccion1 = 'oveja'
    seleccionarRespuestaTouch()
    jugador1 = null
    seleccion1 = null
});

btnVaca.addEventListener('touchstart', () =>{
  pop.play();
  jugador1 = 'vaca'
  seleccion1 = 'vaca'
  seleccionarRespuestaTouch()
  jugador1 = null
  seleccion1 = null
});

btnPollo.addEventListener('touchstart', () =>{
  pop.play();
  jugador1 = 'pollo'
  seleccion1 = 'pollo'
  seleccionarRespuestaTouch()
  jugador1 = null
  seleccion1 = null
});
btnOveja2.addEventListener('touchstart', function () {
  pop.play();
  jugador2 = 'oveja'
  seleccion2 = 'oveja'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
});
btnVaca2.addEventListener('touchstart', function () {
  pop.play();
  jugador2 = 'vaca'
  seleccion2 = 'vaca'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
});

btnPollo2.addEventListener('touchstart', function () {
  pop.play();
  jugador2 = 'pollo'
  seleccion2 = 'pollo'
  seleccionarRespuestaTouch()
  jugador2 = null
  seleccion2 = null
})


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

function seleccionRespuesta(event){ //esta función guarda en una variable cada selección del jugador 

  console.log(event.key)

 if(controlesJugador1.includes(event.key)){
    jugador1 = event.key
 }else if(controlesJugador2.includes(event.key)){
    jugador2 = event.key
 }

 if(jugador1 && jugador2){
   console.log('selección realizada ') 
   clearInterval(revisando)
   revisarSeleccion();
 }
}

function seleccionarRespuestaTouch(){
  if(jugador1 && jugador2){
    console.log('selección realizada ') 
    clearInterval(revisando)
    revisarSeleccion();
  }
}


function revisarSeleccion(){
  let jugador1Gana = false
  let jugador2Gana = false

  switch(jugador1){
    case 'q':
      pop.play();
      seleccion1 = 'oveja'
      break
    
    case "w" :
      pop.play();
      seleccion1 = 'vaca'
      break

    case "e":
      pop.play();
      seleccion1 = 'pollo'
  }

  switch(jugador2){
    case 'ArrowLeft':
      pop.play();
      seleccion2 = 'oveja'
      break
    
    case "ArrowDown" :
      pop.play();
      seleccion2 = 'vaca'
      break

    case "ArrowRight":
      pop.play();
      seleccion2 = 'pollo'
  }

  console.log(seleccion1 + "ademas de " +seleccion2)

  if(seleccion1 === imageName){
    jugador1Gana = true
    

  }

  if(seleccion2 === imageName){
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



function iniciarJuego(){
  
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
  juegoActivo = true
  clearInterval(revisando)
  vidaRestante = 100
  vida.style.width = `${vidaRestante}%`
  iniciarJuego()
}

iniciarJuego();