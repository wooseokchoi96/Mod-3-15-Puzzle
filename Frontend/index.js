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

function switchTiles(e) {
    if ((e.target.dataset.x === blankTile.dataset.x || e.target.dataset.y === blankTile.dataset.y) && (e.target !== blankTile)){
        blankTile.innerText = e.target.innerText;
        blankTile.className = 'tile';
        e.target.innerText = ' ';
        e.target.className = 'blanktile';
        blankTile = e.target;
    }
}


// Run
createGrid();
//

let blankTile = board.querySelector('.blanktile');

board.addEventListener("click", e => {
    switchTiles(e)
})