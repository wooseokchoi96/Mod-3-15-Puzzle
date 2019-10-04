// Run

let array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];
const board = document.querySelector('#board');
let allMoves = [];
let userMoves = [];
const playButton = document.querySelector('#play');
const solveButton = document.querySelector('#solve');
const nameForm = document.querySelector('#enterName');
const yourHighScores = document.querySelector('#yourHighScores');
const allHighScores = document.querySelector('#allHighScores');

createGrid();
getHighestScores();

let blankTile = board.querySelector('.blanktile');

enterName.addEventListener("submit", e => {
    e.preventDefault();
    playButton.disabled = false;
    yourHighScores.className = 'rightContent';
    let nameInput = e.target.firstElementChild.value;
    let inputButton = e.target.querySelector("input[type=submit]");
    fetchYourScores(nameInput)
    if (inputButton.value === "Submit"){ hideSignIn(nameInput); }
})

document.addEventListener("click", e => {
    if (e.target === playButton){
        allMoves = [];
        userMoves = [];
        clearGrid();
        createGrid();
        blankTile = board.querySelector('.blanktile');
        solveButton.disabled = false;
        randomizeBoard();
        console.log(allMoves)
        timer();
        board.addEventListener("click", allowMoveTiles);
    } else if (e.target === solveButton){
        clearInterval(currentTime);
        solveButton.disabled = true;
        playButton.disabled = true;
        let newarr = shrink([...allMoves, ...userMoves]);
        solve(newarr);
        board.removeEventListener("click", allowMoveTiles);
        setTimeout(() => {playButton.disabled = false}, 2000);
    } else if (e.target.value === 'Log Out'){
        document.location.reload(true);
    }
})





////////////////////////////////////////////////////////////////////

function allowMoveTiles(event){
    switchMultipleTiles(event);
}

function hideSignIn(nameInput){
    let inputName = document.querySelector("#enterName");
    inputName.innerHTML = `
        <form id='inputName'>
            Welcome <span>${nameInput}</span>!
            <input type="submit" value="Log Out">
        </form>
    `
}

function clearGrid(){
    board.innerHTML = '';
}

function createGrid(){
    let counter = 0;
    for (let y=0; y < 4; y++){
        for (let x=0; x < 4; x++){
            if (counter < 15){
                if(counter % 2 === 0 ){
                    board.insertAdjacentHTML("beforeend", `
                        <div class="tile odd" data-type='boardTile' data-x=${x} data-y=${y}>${array[counter]}</div>`);
                }else{
                    board.insertAdjacentHTML("beforeend", `
                        <div class="tile even" data-type='boardTile' data-x=${x} data-y=${y}>${array[counter]}</div>`);
                }
            } else{
                board.insertAdjacentHTML("beforeend", `
                    <div class="blanktile" data-type='boardTile' data-x=${x} data-y=${y}>${array[counter]}</div>`);
            }
            counter++;
        }
    }
}

function getHighestScores(){
    fetch('http://localhost:3000/scores/top')
    .then(resp => resp.json())
    .then(scores => renderAllScores(scores, document.querySelector('#allHighScores ol')))
}

function switchMultipleTiles(e) {
    let user = document.querySelector("#enterName > span").innerText
    let timerDiv = document.querySelector('#timer');
    if ((e.target.dataset.x === blankTile.dataset.x 
        || e.target.dataset.y === blankTile.dataset.y) 
        && (e.target !== blankTile)){
            let xSpacesAway = e.target.dataset.x - blankTile.dataset.x
            let ySpacesAway = e.target.dataset.y - blankTile.dataset.y
            for (let i = Math.abs(xSpacesAway + ySpacesAway); i > 0  ; i--){
                if (xSpacesAway){
                    moveHorizontal(xSpacesAway)
                    if (xSpacesAway > 0){
                        userMoves.push(1)
                    }else{
                        userMoves.push(0)
                    }
                }else{
                    moveVertical(ySpacesAway)
                    if (ySpacesAway > 0) {
                        userMoves.push(3)
                    } else {
                        userMoves.push(2)
                    }
                }
                
            }
        if (checkWin()) {
            clearInterval(currentTime);
            setTimeout(() => {alert(`You Won! Time: ${timerDiv.innerText}`);}, 500);
            addSpin()
            removeSpin()
            persistScore(timerDiv.innerText, user)
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

function randomizeBoard(){
    for (let i = 0; i < 1000 ; i++) {
        let direction = Math.floor(Math.random() * 4)
        moveByNumber(direction)
    }
}

function moveByNumber(direction, solveMode = false) {

    if (direction === 0) {
        if (blankTile.dataset.x > 0) { 
            if (!solveMode){
                allMoves.push(direction)
            }
            moveHorizontal(-1) 
        }
    }
    else if (direction === 1) {
        if (blankTile.dataset.x < 3) { 
            if (!solveMode) {
                allMoves.push(direction)
            }
            moveHorizontal(1) 
        }
    }
    else if (direction === 2) {
        if (blankTile.dataset.y > 0) { 
            if (!solveMode) {
                allMoves.push(direction)
            }
            moveVertical(-1) 
        }
    }
    else if (direction === 3) {
        if (blankTile.dataset.y < 3) { 
            if (!solveMode) {
                allMoves.push(direction)
            }
             moveVertical(1) 
            }
    }
}

function solve(moves) {
    
    newmoves = moves.reverse()
    let cycle = setInterval(function(){
        if (newmoves.length){
            if (newmoves[0] % 2 === 0) {
                moveByNumber(parseInt(newmoves[0]) + 1, true)
            }
            else {
                moveByNumber(parseInt(newmoves[0]) - 1, true)
            }
            newmoves.shift()
        }else{
            clearInterval(cycle)
        }
    }, 5)
}

function timer(){
    if(typeof currentTime !== 'undefined'){clearInterval(currentTime);}
    let counter = 0;
    let timerDiv = document.querySelector('#timer');
    timerDiv.innerText = '00:00:00';

    currentTime = setInterval(function(){
        counter += 1;
        timerDiv.innerText = showTime(counter);
    }, 1000)
    showTime(counter);
}

function showTime(counter){
    let hours   = Math.floor(counter / 3600);
    let minutes = Math.floor((counter - (hours * 3600)) / 60);
    let seconds = counter - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function renderAllScores(scores, location){
    scores = scores.slice(0,10);
    scores.forEach( (score) => {
        str = `<li>${score.user.name} : ${score.score}</li>`;
        location.insertAdjacentHTML("beforeend",str);
    })
}

function renderMyScores(scores, location){
    scores.sortedScores = scores.sortedScores.slice(0,10);
    scores.sortedScores.forEach((score) => {
        str = `<li>${score}</li>`;
        location.insertAdjacentHTML("beforeend",str);
    })


}
function persistScore(score, username) {
    //fetch post request with new score and optimistically add score to high scores if it qualifies
    fetch("http://localhost:3000/scores/new", {
        method: 'POST', 
        body: JSON.stringify({ 
            score: score, 
            username: username}
            ), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data);

    clearHighScores(document.querySelector("#allHighScores > ol"))
    getHighestScores()
    clearHighScores(document.querySelector("#yourHighScores > ol"))
    fetchYourScores(data.user.name)

    })
        
        
    // .then(document.querySelector('#yourHighScores').className = 'rightContent')
}

function addSpin(){
    let ts = document.querySelectorAll(".tile")
    ts.forEach((ts)=>{
        ts.classList.add("spin")
    })
}

function removeSpin(){
    setTimeout(function(){
        let ts = document.querySelectorAll(".tile")
        ts.forEach((ts) => {
            ts.classList.remove("spin")
        })
    }, 800)
}


function clearHighScores(location){
    location.innerHTML = ""
}

function fetchYourScores(nameInput){
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameInput })
    })
        .then(resp => resp.json())
        .then(scores => renderMyScores(scores, document.querySelector('#yourHighScores > ol')))
}

function shrink(array){
   let swtch = false
   while(swtch === false){
        swtch = true 
        for(let i = 1; i < array.length; i++){
            if (array[i - 1] + array[i] === 1 || array[i - 1] + array[i] === 5){
                swtch = false
                array = [...array.slice(0,i-1),  ...array.slice(i+1)]
                i += array.length + 10000
            }
        }

   }
   return array
}