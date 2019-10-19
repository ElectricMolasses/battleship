const {
  createBoard,
  placeShip,
  fire
} = require('./battleship');

const requests = {
  'startGame': startGame,
  'fire': 0,
  'placeShip': 0,
  'endTurn': 0,
  'goesFirst': 0,
  'getLeaderboard': 0,
};

const directions = {
  'opponentsShot': 0
};

// Include for main.js, will handle communication back and forth
// between it and the battleship file.
// Effectively exists to help control what functions main can access,
// in addition to filtering input.

const request = function(command) {

};

// Will need to request to place a ship.
// Will need to request to remove a ship.
// Will need to request to fire a shot.

const receive = function() {

};

// Will need to send opponents shots to the players board.
const playerBoard;
const opponentBoard;

const startGame = function() {
  playerBoard = createBoard();
  opponentBoard = createBoard();
};