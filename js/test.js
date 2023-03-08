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
  })
})

const computerButtonEl = document.querySelector('#computer-button');
computerButtonEl.addEventListener('click', function() {
  addPiece(getRandomNumber(), computer);
})

// init()
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
  renderComputerButton();
}

// render buttons
function renderPlayerButtons() {
  const playerButtonContainer = document.createElement('div');
  playerButtonContainer.id = 'player-buttons';
  document.querySelector('body').appendChild(playerButtonContainer);
  for (let i = 1; i<=columns; i++) {
    const buttonEL = document.createElement('button');
    buttonEL.classList.add('player-button');
    buttonEL.id = `button-${i}`;
    buttonEL.textContent = `Column ${i}`;
    playerButtonContainer.appendChild(buttonEL);
  }
}

function renderComputerButton() {
  const computerButtonContainer = document.createElement('div');
  computerButtonContainer.id = 'computer-button-container';
  document.querySelector('body').appendChild(computerButtonContainer);
  const computerButton = document.createElement('button');
  computerButton.textContent = "Computer Turn";
  computerButton.id = 'computer-button';
  document.querySelector('#computer-button-container').appendChild(computerButton);
}

// Initial set up of board
function renderBoard() {
  const boardContainer = document.createElement('div');
  boardContainer.id = "board-container";
  document.querySelector('body').appendChild(boardContainer);
  for(let i=0; i < columns; i++){
    const column = document.createElement('div');
    column.id = `column-${i}`
    boardContainer.appendChild(column);
    for(let j=0; j<rows; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `C${i} R${j}`;
      column.appendChild(cell);
    }
  }
  }

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
    

function addPiece(column, user) {
  for (let i = columns; i >= 0; i--) {
    if (board[column][i] === 0) {
      board[column][i] = user;
      break;
    }
  }
  updateView();
  checkWinner(column, user);
}
  
// Function to get random number for computer turn
function getRandomNumber() {
  number = Math.floor(Math.random()*7);
  console.log(number);
  return number;
}

// win condition

function checkWinner(column, user) {
    // vertical check
    for (let i = 0; i<columns; i++){
        if (board[column][i] === user &&
            board[column][i+1] === user &&
            board[column][i+2] === user &&
            board[column][i+3] === user) {
                console.log('We have a winner');
            }
    for (let i=5; i>=0; i--)
            if (board[column][i] === user &&
            board[column+1][i] === user &&
            board[column+2][i] === user &&
            board[column+3][i] === user) {
                console.log('We have a winner');
            }
    }
}