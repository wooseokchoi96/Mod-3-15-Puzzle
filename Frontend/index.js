let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
const board = document.querySelector('#board');

function createGrid(){
    let counter = 0;
    for (let y=0; y < 4; y++){
        for (let x=0; x < 4; x++){
            if (counter < 15){
                board.insertAdjacentHTML("beforeend", `
                    <div class="tile" data-x=${x} data-y=${y}>${array[counter]}</div>`);
            } else{
                board.insertAdjacentHTML("beforeend", `
                    <div class="blanktile" data-x=${x} data-y=${y}>${array[counter]}</div>`);
            }
            counter++;
        }
    }
}

function isX(xSpacesAway, ySpacesAway){
    if (xSpacesAway){
        if(xSpacesAway < 0){
            return "-x"
        } else {
            return "x"
        }   
    }
}

function switchTile(e, xOrY, i) {
    if (xOrY === "x"){
        if (xSpacesAway < 0){

        } else {

        }
    } else {

    }
}

function switchMultipleTiles(e) {
    if ((e.target.dataset.x === blankTile.dataset.x 
        || e.target.dataset.y === blankTile.dataset.y) 
        && (e.target !== blankTile)){
            let xSpacesAway = e.target.dataset.x - blankTile.dataset.x
            let ySpacesAway = e.target.dataset.y - blankTile.dataset.y
            let xOrY = isX(xSpacesAway, ySpacesAway);
            for (let i = Math.abs(xSpacesAway + ySpacesAway); i > 0  ; i--){
               switchTile(e, xOrY, i);
            }
    }
}


// Run
createGrid();
//

let blankTile = board.querySelector('.blanktile');

board.addEventListener("click", e => {
    // switchTiles(e)
    switchMultipleTiles(e)
})