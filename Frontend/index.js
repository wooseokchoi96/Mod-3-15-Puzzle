let array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];
const board = document.querySelector('#board');

function createGrid(){
    let counter = 0;
    for (let y=0; y < 4; y++){
        for (let x=0; x < 4; x++){
            if (counter < 15){
                board.insertAdjacentHTML("beforeend", `
                    <div class="tile" data-type='boardTile' data-x=${x} data-y=${y}>${array[counter]}</div>`);
            } else{
                board.insertAdjacentHTML("beforeend", `
                    <div class="blanktile" data-type='boardTile' data-x=${x} data-y=${y}>${array[counter]}</div>`);
            }
            counter++;
        }
    }
}

function switchMultipleTiles(e) {
    if ((e.target.dataset.x === blankTile.dataset.x 
        || e.target.dataset.y === blankTile.dataset.y) 
        && (e.target !== blankTile)){
            let xSpacesAway = e.target.dataset.x - blankTile.dataset.x
            let ySpacesAway = e.target.dataset.y - blankTile.dataset.y
            for (let i = Math.abs(xSpacesAway + ySpacesAway); i > 0  ; i--){
                xSpacesAway ? moveHorizontal(xSpacesAway) : moveVertical(ySpacesAway);
            }
        if (checkWin()){
            console.log('You Won!')
        }
    }
}

function moveHorizontal(x){
    if (x > 0) {
        swapTile = board.querySelector(`[data-y='${blankTile.dataset.y}'][data-x='${parseInt(blankTile.dataset.x) + 1}']`)
    } else {
        swapTile = board.querySelector(`[data-y='${blankTile.dataset.y}'][data-x='${blankTile.dataset.x - 1}']`)
    }
    change(swapTile)
}

function moveVertical(y){
    if (y > 0) {
        swapTile = board.querySelector(`[data-x='${blankTile.dataset.x}'][data-y='${parseInt(blankTile.dataset.y) + 1}']`)
    } else {
        swapTile = board.querySelector(`[data-x='${blankTile.dataset.x}'][data-y='${blankTile.dataset.y - 1}']`)
    }
    change(swapTile)
}

function change(swapTile){
    blankTile.innerText = swapTile.innerText
    blankTile.className = swapTile.className
    swapTile.innerText = ''
    swapTile.className = 'blanktile'
    blankTile = board.querySelector('.blanktile');
}

function arraysEqual(arr1, arr2){
    if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length){return false;}
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]){return false;}
    }
    return true;
}

function checkWin(){
    let currentArray = [];
    let allTiles = board.querySelectorAll('[data-type="boardTile"]');
    allTiles.forEach(tile => {currentArray.push(tile.innerText);})
    return arraysEqual(currentArray, array);
}

// Run
createGrid();

let blankTile = board.querySelector('.blanktile');

board.addEventListener("click", e => {
    switchMultipleTiles(e)
})
//