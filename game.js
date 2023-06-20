const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // Le damos a la variable game infinidad de propiedades y métodos

window.addEventListener('load', setCanvasSize); // Una vez cargue la página ejecuta la función
window.addEventListener('resize', setCanvasSize); // Cada vez que se detecte cambio de tamaño la página ejecuta la función

let canvasSize;
let elementSize;
let level =0;
let live = 3;
let stopGame = false;
let timeInterval;
let timeStart = 0;
let enemyPositions = []; // Posición de las bombas
const spanLives = document.querySelector('#vidas');
const timeGame = document.querySelector('#tiempo');
const recordPlayer = document.querySelector('#record');

// timeGame.innerHTML = emojis["Time"];

const playerPosition = { // Posición del player
    x: undefined,
    y: undefined,
}

const giftPosition = { // Posición del regalo
    x: undefined,
    y: undefined,
}

const firePosition = { // Posición del fuego cuando estalle una bomba
    x: undefined,
    y: undefined,
}

window.addEventListener('keydown', moveByKeys); // Detecta cuando pulsamos una tecla y llama la función moveByKeys

if(!timeInterval){
    timeInterval = setInterval(()=> timeGame.innerHTML = emojis["Time"] +' '+ timeStart++ +' seg.',1000);
    recordPlayer.innerHTML = emojis["Record"] +' '+ localStorage.getItem('record');
}

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }    
    canvas.setAttribute('width', canvasSize); // Asignamos el ancho del canvas al 80% del tamaño de la pantalla
    canvas.setAttribute('height', canvasSize); // Asignamos el alto del canvas al 80% del tamaño de la pantalla
    
    elementSize = canvasSize/10.35; // Se defne el tamaño de las imágenes a renderizar en el mapa.
    startGame();
}    

function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(live)
}

function startGame(){
    showLives();

    game.font = elementSize+'px Verdana'; // Define el tamaño de la imagen 💣
    enemyPositions = []; // Limpiamos la variable
    
    const map = maps[level]; // Se escoge el mapa 0
    const mapsRow = map.trim().split('\n');
    // trim() quita los espacios tanto al final como al inicio del string.
    // split() Devuelve un array de varios datos separados por el dato que se le indique.
    const mapsRowCols = mapsRow.map(row => row.trim().split('')); // mapsRowCols queda convertido en un array de arrays
    
    game.clearRect(0,0,canvasSize,canvasSize); // Limpia todo el canvas
    mapsRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => { // Se itera el mapa 0
            const emoji = emojis[col];
            const posX = elementSize *(colI);
            const posY = elementSize *(rowI+1);
            if(col == 'O'){ // Identifica la posición de la puerta
                if(!playerPosition.x && !playerPosition.y){  // Si al player no se ha asignado posición, se le asigna
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }else{
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log('llego');
                }
            }else if(col == 'I'){ // Identifica la posición del regalo
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col == 'X'){ // Identifica la posición de la bomba
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }
            const enemyCollision = enemyPositions.find(enemy => {
                const enemyCollisionX = enemy.x == playerPosition.x;
                const enemyCollisionY = enemy.y == playerPosition.y;
                return enemyCollisionX && enemyCollisionY;
            });
            game.fillText(emoji, posX, posY); // Se itera las imagenes respecto a su posición
        });
    });
    movePlayer();
}
    
function movePlayer(){
    if(Math.trunc(playerPosition.x) == Math.trunc(giftPosition.x) && Math.trunc(playerPosition.y) == Math.trunc(giftPosition.y)){ // Valida si llegó al regalo
        level++; // Si la posición del player coinside con el del regalo sube el nivel
        if(maps.length > level){
            startGame();
        }else{
            clearInterval(timeInterval);
            record(true);
            console.log('Felicitaciones, has finalizado el juego, tu record es: '+timeStart);
        }
    }

    const enemyCollision = enemyPositions.find(enemy => { // Recorre el array de las bombas
        const enemyCollisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition.x); // Compara la posición del player en X con el de la bomba X
        const enemyCollisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition.y); // Compara la posición del player en Y con el de la bomba Y
        return enemyCollisionX && enemyCollisionY; // Retorna verdadero si el player pisa una bomba
    });

    if(enemyCollision){
        live--;
        if(live == 0){
            live = 3;
            level = 0;
            record(false);
        }else{
            game.fillText(emojis['F'], playerPosition.x, playerPosition.y); // Renderiza la llama
        }
        playerPosition.x = undefined; // Devuelve a la posición inicial al player
        playerPosition.y = undefined;
        startGame();
    }
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveByKeys(event){
    if(event.key == 'Escape'){
        stopGame = !stopGame;
        clearInterval(timeInterval);
        if(stopGame){
            alert('PAUSA');
        }else{
            timeInterval = setInterval(()=> timeGame.innerHTML = emojis["Time"] +' '+ timeStart++ +' seg.',1000);
        }
        console.log(stopGame);
    }

    if(live > 0 && level < maps.length && !stopGame){
        switch(event.key){
            case 'ArrowUp':
                if(playerPosition.y > (elementSize+0.1)){
                    playerPosition.y -= elementSize;
                    startGame();
                }
            break;
            case 'ArrowRight':
                if(playerPosition.x < (elementSize*9)){
                    playerPosition.x += elementSize;
                    startGame();
                }
            break;
            case 'ArrowDown':
                if(playerPosition.y < (elementSize*9.1)){
                    playerPosition.y += elementSize;
                    startGame();
                }
            break;
            case 'ArrowLeft':
                if(playerPosition.x > (elementSize-0.1)){
                    playerPosition.x -= elementSize;
                    startGame();
                }
            break;
        }
    }
}

function record(finish){
    if(finish){
        if(!localStorage.getItem('record')){
            localStorage.setItem('record',timeStart);
        }else if(localStorage.getItem('record') > timeStart){
            console.log('Nuevo record: '+timeStart);
            localStorage.setItem('record',timeStart);
        }
        // clearInterval(timeInterval);
        // startGame();
    }else{
        console.log('Fin del juego, tu record es: '+timeStart);
    }
    timeStart = 0;
}
