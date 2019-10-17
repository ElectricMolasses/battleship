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

const placeShip = function(x, y, orientation, ship) {
  
};

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