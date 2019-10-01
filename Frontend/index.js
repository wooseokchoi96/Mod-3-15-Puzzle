let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
const board = document.querySelector('#board');

function createGrid(){
    let counter = 0;
    for (let y=0; y < 4; y++){
        for (let x=0; x < 4; x++){
            if (counter < 15){
                board.insertAdjacentHTML("beforeend", `
                    <div class="tile" data-type="boardTile" data-x=${x} data-y=${y}>${array[counter]}</div>`);
            } else{
                board.insertAdjacentHTML("beforeend", `
                    <div class="blanktile" data-type="boardTile" data-x=${x} data-y=${y}>${array[counter]}</div>`);
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
    }
}


function moveHorizontal(x){
    if (x > 0) {
        swapTile = board.querySelector(`[data-y='${blankTile.dataset.y}'][data-x='${parseInt(blankTile.dataset.x) + 1}']`)
        console.log(swapTile)
    } else {
        swapTile = board.querySelector(`[data-y='${blankTile.dataset.y}'][data-x='${blankTile.dataset.x - 1}']`)
        console.log(swapTile)
    }
    change(swapTile)
}


function moveVertical(y){
    if (y > 0) {
        swapTile = board.querySelector(`[data-x='${blankTile.dataset.x}'][data-y='${parseInt(blankTile.dataset.y) + 1}']`)
        console.log(swapTile)
    } else {
        swapTile = board.querySelector(`[data-x='${blankTile.dataset.x}'][data-y='${blankTile.dataset.y - 1}']`)
        console.log(swapTile)
    }
    change(swapTile)
}


function change(swapTile){
    blankTile.innerText = swapTile.innerText
    blankTile.className = 'tile'
    swapTile.innerText = " "
    swapTile.className = "blanktile"
    blankTile = board.querySelector('.blanktile');

}



function randomizeBoard(){
    for (let i = 0; i < 100 ; i++) {
        let direction = Math.floor(Math.random() * 4)

        if(direction === 0){
            if (blankTile.dataset.x > 0) { moveHorizontal(-1)}
        }
        else if(direction === 1) {
            if (blankTile.dataset.x < 3) { moveHorizontal(1) }
        }
        else if (direction === 2) {
            if (blankTile.dataset.y > 0) { moveVertical(-1) }
        }
        else if (direction === 3) {
            if (blankTile.dataset.y < 3) { moveVertical(1) }
        }
    }
}






// Run
createGrid();
//

let blankTile = board.querySelector('.blanktile');

board.addEventListener("click", e => {
    switchMultipleTiles(e)
})
document.addEventListener("click", e =>{
    // console.log(e.target.innerText)
    if (e.target.innerText === "Randomize"){
        randomizeBoard()
    }
})
