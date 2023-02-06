var consoleText = document.getElementById('consoleText');
var restartButton = document.getElementById('restartButton');
var boxes = Array.from(document.getElementsByClassName('box')) 
var winningBlockIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
var drawBlocksIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks')
// console.log(boxes)
let count_play = 0;
const O_LETTER = "O"
const X_LETTER = "X"
var currentPlayer = X_LETTER
var spaces = Array(9).fill(null)

// 
const startGame = () =>  {
boxes.forEach(box => box.addEventListener('click', boxClicked))

}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && count_play < 9) {
        spaces[id] = currentPlayer; 
        e.target.innerText = currentPlayer

        if(playerHasWon()!==false) {
            consoleText.innerHTML = `${currentPlayer} has won !!`;
            var winning_blocks = playerHasWon();
            count_play = 10
            console.log(winning_blocks);
            winning_blocks.map( box => boxes[box].style.backgroundColor = winningBlockIndicator);
            return 
        }
        count_play++
        currentPlayer = currentPlayer == X_LETTER ? O_LETTER: X_LETTER;
    }

    if (count_play === 9) {
        consoleText.innerHTML = 'Game Draw!'
        boxes.forEach(box => box.style.color = drawBlocksIndicator)
    }
}

const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [6,4,2],
    [0,4,8]
 ]

function playerHasWon() {
    for (const combo of winCombinations) {
        let [a,b,c] = combo

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false
}
 
restartButton.addEventListener('click',restart)

function restart() {
    spaces.fill(null)
    count_play = 0; 
    boxes.forEach (box => {
        box.innerText = ''
        box.style.backgroundColor=''
         box.style.color = '#2f2c2c';
    })

    consoleText.innerHTML = 'Tic-Tac-Toe'
    currentPlayer = X_LETTER;

}

startGame() 