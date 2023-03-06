// Model - What values will need to be updated
let winner;
let board= [
  [0, 0, 0, 0, 0, 0],  // column 0
  [0, 0, 0, 0, 0, 0],  // column 1
  [0, 0, 0, 0, 0, 0],  // column 2
  [0, 0, 0, 0, 0, 0],  // column 3
  [0, 0, 0, 0, 0, 0],  // column 4
  [0, 0, 0, 0, 0, 0],  // column 5
  [0, 0, 0, 0, 0, 0]   // column 6
];





const playerButtonELs = document.querySelectorAll('.player-button');
playerButtonELs.forEach((button, index) => {
  button.addEventListener('click', function() {
    addPlayerPiece(index + 1);
  })
})

const computerButtonEl = document.querySelector('#computer-button');
computerButtonEl.addEventListener('click', function() {
  addComputerPiece(getRandomNumber());
})

function addPlayerPiece(column) {
    const items = document.querySelectorAll(`#column-${column} .item`);
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!item.classList.contains('filled')) {
        item.classList.add('filled');
        item.classList.add('playerFilled');
        break;
      }
    }
  }

  function addComputerPiece(column) {
    const items = document.querySelectorAll(`#column-${column} .item`);
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!item.classList.contains('filled')) {
        item.classList.add('filled');
        item.classList.add('computerFilled');
        break;
      }
    }
  }

  function getRandomNumber() {
    number = Math.floor(Math.random()*7);
    return number + 1;
  }