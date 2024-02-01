window.addEventListener('keydown', moveKeyBoard);

let teclas = []


function moveKeyBoard(key){
    
    console.log(key.key)
    teclas.push(key.key)     
}

function gano(){
    console.log(teclas)

    if(teclas.length > 2){
        teclas.splice(2,teclas.length)
    }

    console.log(teclas)

    if(teclas[0]=== 'q' && teclas[1]=== 'w' || teclas[1]=== 'q' && teclas[0]=== 'w'){
        console.log('ganaste')
        juego();
    }else{
        console.log('perdite');
        
    }

    teclas.splice(0,teclas.length)
}

function juego(){


        console.log('Selecciona una imagen')
    
        setTimeout(() => {
            gano();
        },5000);

}
juego();
