const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

// function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI par bhi empty krna padhega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initialise box with css properties again
        box.classList = `box box${index+1}`;

    });
    // strating me new game btn ko hide karne ke liye
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // All 3 boxes should be non-empty and same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {
        
            // Check if winner is X
            if(gameGrid[position[0]] === "X")
                answer ="X";
            else
               answer = "O";
            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

             

        }

    });

    // It means we have winner
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    // Let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    // Board is filled,game is tie
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // Swap Turn
        swapTurn();
        // check koi jeet to ni gya
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);
