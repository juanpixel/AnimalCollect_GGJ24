//Elementos traidos del HTML

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

btnOveja.addEventListener('touch', () => {
  btnOveja.click()
});

btnVaca.addEventListener('touch', () => {
  btnVaca.click()
});

btnPollo.addEventListener('touch', () => {
  btnPollo.click()
});

btnOveja2.addEventListener('touch', () => {
pop.play();
btnOveja2.click()
});

btnVaca2.addEventListener('touch', () => {
pop.play();
btnOveja2.click()
});

btnPollo2.addEventListener('touch', () => {
pop.play();
btnOveja2.click()
});


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