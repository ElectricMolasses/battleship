/*  Will be brought back if this is ever moved to a proper backend for multiplayer.
const {
  createBoard,
  placeShip,
  fire
} = require('./battleship');
*/
let playerBoard;
let opponentBoard;
let currentTurn;
let winLoss = [0, 0];

const startGame = function(goesFirst) {
  playerBoard = createBoard();
  opponentBoard = createBoard();
  if (goesFirst === 'player') {
    currentTurn = 'player';
  } else {
    currentTurn = 'opponent';
  }
};

startGame();

const requestPlaceShip = function(x, y, ship, orientation) {
  // Will return true if placed, and false if not.
  return placeShip(x, y, ship, orientation, playerBoard, 'player');
};

const requestRemoveShip = function(ship) {
  // Will return true if removed, and false if not.
  return removeShip(ship, playerBoard, 'player');
};

const requestFire = function(x, y) {
  return fire(x, y, opponentBoard, 'computer');

  endTurn();
};

const endTurn = function() {

};

const getScore = function() {
  return winLoss;
};

const requests = {
  'startGame': startGame,
  'fire': requestFire,
  'placeShip': requestPlaceShip,
  'requestRemoveShip': requestRemoveShip,
  'endTurn': endTurn,
  'goesFirst': 0,
  'getScore': getScore,
};

const directions = {
  'opponentsShot': 0
};

// Include for main.js, will handle communication back and forth
// between it and the battleship file.
// Effectively exists to help control what functions main can access,
// in addition to filtering input.

const request = function(command, args) {
  if (command in requests) {
    command(args);
  } else throw Error("Invalid request: " + command);
};

// Will need to request to place a ship.
// Will need to request to remove a ship.
// Will need to request to fire a shot.

const receive = function() {

};

// Will need to send opponents shots to the players board.
