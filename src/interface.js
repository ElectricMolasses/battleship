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
let gameStage = 'over';
let winLoss = [0, 0];
const playerShipStatus = {};
const opponentShipStatus = {};

const startGame = function(goesFirst) {
  if (gameStage === 'over' ||
      gameStage === undefined) {
    gameStage = 'placement';

    playerBoard = createBoard();
    opponentBoard = createBoard();
    resetShipStatus(playerShipStatus);
    resetShipStatus(opponentShipStatus);
  }
  if (gameStage === 'placement') {
    // Check if all ships are placed.
    // If they are not, tell the player to place them.
    // If they are, start the match.
    if (areAllShipsPlaced()) {
      dumbPlacement(opponentBoard, 'computer');
      gameStage = 'playing';
      if (goesFirst === 'player') {
        currentTurn = 'player';
      } else {
        currentTurn = 'opponent';
      }
    }
  }
  if (gameStage === 'playing') {
    // Ask the player if they would like to restart.
    // If they would, clear the boards and set to placement.
  }
};

const resetShipStatus = function(playerShips) {
  playerShips.carrier = true;
  playerShips.battleship = true;
  playerShips.cruiser = true;
  playerShips.submarine = true;
  playerShips.destroyer = true;
};

const requestPlaceShip = function(x, y, ship, orientation) {
  // Will return true if placed, and false if not.
  if (gameStage === 'placement') {
    return placeShip(x, y, ship, orientation, playerBoard, 'player');
  }
};

const requestRemoveShip = function(ship) {
  // Will return true if removed, and false if not.
  if (gameStage === 'placement') {
    return removeShip(ship, playerBoard, 'player');
  }
};

const areAllShipsPlaced = function() {
  // Will return true if every ship has been placed.
  if (isShipPlaced('carrier', 'player') &&
      isShipPlaced('battleship', 'player') &&
      isShipPlaced('cruiser', 'player') &&
      isShipPlaced('submarine', 'player') &&
      isShipPlaced('destroyer', 'player')) {
        return true;
      } else {
        alert('Please place all of your ships.');
        return false;
      }
};

const requestFire = function(x, y) {
  if (currentTurn !== 'player') return;
  

  if (fire(x, y, opponentBoard, 'computer')) {
    logShot(x, y, true, 'player');
    console.log(SHIPS[opponentBoard[x][y].shipType].computer.hp);
    if (SHIPS[opponentBoard[x][y].shipType].computer.hp === 0) {
      console.log(logSink(x, y, 'player'));
    }
    endTurn();
    return true;
  }
  logShot(x,y, false, 'player');
  endTurn();
  return false;
};

const endTurn = function() {
  currentTurn = 'opponent';
  opponentTurn();
};

const opponentTurn = function() {
  const [x, y, hitStatus] = dumbShot(playerBoard, 'player');
  const cell = convertCoordsToCell(x, y, boardIds[0]);

  logShot(x, y, hitStatus, 'computer');
  if (hitStatus) {
    drawHit(cell);
  } else {
    drawMiss(cell);
  }
  currentTurn = 'player';
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
