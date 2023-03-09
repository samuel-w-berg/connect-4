// State
let winner;
const rows = 6;
const columns = 7;
const player = 1;
const computer = 2;
let board= [[]];

init();

const playerButtonELs = document.querySelectorAll('.player-button');
playerButtonELs.forEach((button, index) => {
  button.addEventListener('click', function() {
    addPiece(index, player);
    setTimeout(addPiece, 750, getRandomNumber(), computer);
  })
})



// Computer button no longer necessary after timeout added to player button, but will leave present

// const computerButtonEl = document.querySelector('#computer-button');
// computerButtonEl.addEventListener('click', function() {
//   addPiece(getRandomNumber(), computer);
// })

// init()---------------------------------------------------------------------------------------
function init(){
  winner = null;
  board = [
    [0, 0, 0, 0, 0, 0],  // column 0
    [0, 0, 0, 0, 0, 0],  // column 1
    [0, 0, 0, 0, 0, 0],  // column 2
    [0, 0, 0, 0, 0, 0],  // column 3
    [0, 0, 0, 0, 0, 0],  // column 4
    [0, 0, 0, 0, 0, 0],  // column 5
    [0, 0, 0, 0, 0, 0]   // column 6
  ];
  renderPlayerButtons();
  renderBoard();
  // renderComputerButton();
}

// render buttons--------------------------------------------------------------------------------
function renderPlayerButtons() {
  const playerButtonContainer = document.createElement('div');
  playerButtonContainer.id = 'player-buttons';
  document.querySelector('body').appendChild(playerButtonContainer);
  for (let i = 1; i<=columns; i++) {
    const buttonEL = document.createElement('button');
    buttonEL.classList.add('player-button');
    buttonEL.id = `button-${i}`;
    buttonEL.textContent = `Place Here`;
    playerButtonContainer.appendChild(buttonEL);
  }
}

// Computer button no longer necessary after timeout added to player button, but will leave present

// function renderComputerButton() {
//   const computerButtonContainer = document.createElement('div');
//   computerButtonContainer.id = 'computer-button-container';
//   document.querySelector('body').appendChild(computerButtonContainer);
//   const computerButton = document.createElement('button');
//   computerButton.textContent = "Computer Turn";
//   computerButton.id = 'computer-button';
//   document.querySelector('#computer-button-container').appendChild(computerButton);
// }

// Initial set up of board----------------------------------------------------------------------
function renderBoard() {
  const boardContainer = document.createElement('div');
  boardContainer.id = "board-container";
  document.querySelector('body').appendChild(boardContainer);
  for(let i=0; i < columns; i++){
    const column = document.createElement('div');
    column.id = `column-${i}`;
    boardContainer.appendChild(column);
    for(let j=0; j<rows; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `C${i} R${j}`;
      column.appendChild(cell);
    }
  }
  }

// render the modal
function renderModal(winner){
    const modalEL = document.createElement('div');
    modalEL.classList.add("modal");
    document.querySelector('body').appendChild(modalEL);
    const winnerMessageEL = document.createElement('h1');
    winnerMessageEL.id = "winner-message";
    if (winner===1){
        winnerMessageEL.textContent = "The player wins!"
    } else if (winner === computer) {
        winnerMessageEL.textContent = "The computer wins!"
    }
    modalEL.appendChild(winnerMessageEL);
    const restartButtonEL = document.createElement('button');
    restartButtonEL.textContent = "Play Again?";
    restartButtonEL.id = "restart-button";
    modalEL.appendChild(restartButtonEL);
    restartButtonEL.addEventListener('click', function() {
        restartGame();
    })
}

function restartGame(){
    winner = null;
    board = [
        [0, 0, 0, 0, 0, 0],  // column 0
        [0, 0, 0, 0, 0, 0],  // column 1
        [0, 0, 0, 0, 0, 0],  // column 2
        [0, 0, 0, 0, 0, 0],  // column 3
        [0, 0, 0, 0, 0, 0],  // column 4
        [0, 0, 0, 0, 0, 0],  // column 5
        [0, 0, 0, 0, 0, 0]   // column 6
    ];
    updateView();
    toggleModal();
}

function toggleModal () {
    if (!winner){
        document.querySelector(".modal").classList.add("hidden")          
    } else {modalEL.classList.remove("hidden")}
}

// update the view from 2D board Array------------------------------------------------------------------
function updateView() {
  for(let i = 0; i < columns; i++) {
    for(let j = rows; j >= 0; j--) {
      const cell = document.getElementById(`C${i} R${j}`);
      if(board[i][j] === player) {
        cell.classList.add('playerFilled');
      } else if(board[i][j] === computer) {
        cell.classList.add('computerFilled');
      }
      }
    }
  }

    
// add piece to 2D board Array----------------------------------------------------------------------------
function addPiece(column, user) {
  for (let i = columns; i >= 0; i--) {
    if (board[column][i] === 0) {
      board[column][i] = user;
      break;
    }
  }
  updateView();
  if(checkWinner(user)) {
    renderModal(winner)
  }
  
}
  
// Function to get random number for computer turn---------------------------------------------------
function getRandomNumber() {
  number = Math.floor(Math.random()*7);
  return number;
}

// win condition--------------------------------------------------------------------------------------

function checkWinner(user) {
    if (checkVertical(user)){winner = user; console.log('We have a winner'); return true}          
    else if (checkHorizontal(user)){winner = user; console.log('We have a winner'); return true}
    else if (checkPositiveDiagonal(user)){winner = user; console.log('We have a winner'); return true}
    else if (checkNegativeDiagonal(user)){winner = user; console.log('We have a winner'); return true}
    else return false;
}

function checkVertical(user) {
    for (let row = 0; row<rows; row++){
        for (let col = 0; col<columns; col++)
        if (board[col][row] === user &&
            board[col][row+1] === user &&
            board[col][row+2] === user &&
            board[col][row+3] === user) {
                return true
            }
        }
        return false; 
}

function checkHorizontal(user) {
    for (let row = 0; row < rows; row++) {
      let count = 0;
      for (let col = 0; col < columns; col++) {
        if (board[col][row] === user) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    return false;
}

//Check for diagonal with a positive slope
function checkPositiveDiagonal(user) {
    for (let row = rows - 1; row >= 3; row--) {             //checks rows from the bottom of the board, stopping at row 3 because the board is not tall enough to start any higher
        for (let col = 0; col <= columns - 4; col++) {      //checks columns from left to right, stopping at column 3 because the board is not wide enough to start any farther
          if (board[col][row] === user &&
              board[col + 1][row - 1] === user &&
              board[col + 2][row - 2] === user &&
              board[col + 3][row - 3] === user) {
            return true;
          }
        }
      }
      return false;
}

//Check for diagonal with a negative slope
function checkNegativeDiagonal(user) {
    for (let row = 0; row <= rows - 4; row++) {             //checks rows from the top of the board, stopping at row 2 because the board is not tall enough to start any lower
        for (let col = 0; col <= columns - 4; col++) {      //checks columns from left to right, stopping at column 3 because the board is not wide enough to start any farther
        if (board[col][row] === user &&
            board[col + 1][row + 1] === user &&
            board[col + 2][row + 2] === user &&
            board[col + 3][row + 3] === user) {
                return true;
        }
        }
    }
    return false;
}

