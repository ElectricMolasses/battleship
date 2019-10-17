const CARRIER_LENGTH = 5;
const BATTLESHIP_LENGTH = 4;
const CRUISER_LENGTH = 3;
const SUBMARINE_LENGTH = 3;
const DESTOYER_LENGTH = 2;

const createBoard = function() {
  let board = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({
        shipType: null,
        wasShot: false
      });
    }
  }

  return board;
};

// Returns boolean as to whether or not ship was actually
// placed.
// Orientation will only accept 'vertical' or 'horizontal'
const placeShip = function(x, y, orientation, ship, board) {
  // Check if index out of bounds.
  if (x < 0 || x > board.length ||
      y < 0 || y > board[x].length) {
    return false;
  }
  // Check if tail of ship is out of bounds
  /*
  if (orientation === 'horizontal') {
    
  } else if (orientation === 'vertical') {
    
  }
  */
};

// This function here is probably just bad practice.
// If the code is never going to be used outside of
// placeShip, just drop it.
const validateShipPlacement = function(x, y, orientation, ship) {

};

// Start game will handle the game loop, created boards for both players, and
// allow interactions to begin.  It will ONLY handle the game logic, actual
// user input will be processed from the main function.
const startGame = function() {
  const playerBoard = createBoard();
  const computerBoard = createBoard();

  let playing = true;

  // Determine who goes first.

  let turn = 'player';

  while (playing) {
    // Accept user input.

    // Accept computer input.
  }
};

module.exports = {
  createBoard
};