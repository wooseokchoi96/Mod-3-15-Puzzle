let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
const board = document.querySelector('#board');
const tiles = board.querySelectorAll('.tile');

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

document.querySelector('#board').addEventListener("click", e => {
    console.log(e.target);
})

// Run
createGrid();
//