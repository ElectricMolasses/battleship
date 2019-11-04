/*  Will be brought back if this is ever moved to a proper backend for multiplayer.
const {
  createBoard,
  placeShip,
  fire
} = require('./battleship');
*/
let playerIBoard;
let opponentIBoard;
let currentTurn;
let gameStage = 'over';
let winLoss = [0, 0];
let playerShips;
let opponentShips;

let memory = [];

const startGame = function(goesFirst) {
  if (gameStage === 'over' ||
      gameStage === undefined) {
    gameStage = 'placement';
    playerIBoard = createBoard();
    opponentIBoard = createBoard();
  } else if (gameStage === 'placement') {
    // Check if all ships are placed.
    // If they are not, tell the player to place them.
    // If they are, start the match.
    if (areAllShipsPlaced()) {
      dumbPlacement(opponentIBoard, 'computer');
      playerShips = 5;
      opponentShips = 5;
      gameStage = 'playing';
      if (goesFirst === 'player') {
        currentTurn = 'player';
        $("#currentPlayer").text('Player');
      } else {
        currentTurn = 'opponent';
        $("#currentPlayer").text('Computer');
      }
    }
  } else if (gameStage === 'playing') {
    // Ask the player if they would like to restart.
    // If they would, clear the boards and set to placement.
    if (window.confirm("Would you like to end this match?")) {
      gameStage = 'over';
      resetSHIPS();
      startGame();
      return 'clearBoard';
    }
  }
};

const gameOver = function(winner) {
  if (winner === 'player') winLoss[0]++;
  else winLoss[1]++;

  // Place an overlay window with the current leaderboard, and a new button to play again.
  $("#score").text(`${winLoss[0]} - ${winLoss[1]}`);
  $("#leaderBoard").css('visibility', 'visible');
};

const requestPlaceShip = function(x, y, ship, orientation) {
  // Will return true if placed, and false if not.
  if (gameStage === 'placement') {
    return placeShip(x, y, ship, orientation, playerIBoard, 'player');
  }
};

const requestRemoveShip = function(ship) {
  // Will return true if removed, and false if not.
  if (gameStage === 'placement') {
    return removeShip(ship, playerIBoard, 'player');
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
  if (currentTurn !== 'player' || gameStage !== 'playing') return;
  

  if (fire(x, y, opponentIBoard, 'computer')) {
    logShot(x, y, true, 'player');
    if (didSink(x, y, opponentIBoard, 'computer')) {
      logSink(opponentIBoard[x][y].shipType, 'player');
      opponentShips--;

      // Mark ship as destroyed in UI.
      displaySink(opponentIBoard[x][y].shipType, 'computer');

      // If opponentShips hits 0, win.
      if (opponentShips < 1) {
        gameOver('player');
      }
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
  $("#currentPlayer").text('Computer');
  setTimeout(() => {
    opponentTurn();
  }, Math.random() * 1000 + 800);
  
};

const opponentTurn = function() {
  const [x, y, hitStatus] = dumbShot(playerIBoard, 'player', memory);
  const cell = convertCoordsToCell(x, y, boardIds[0]);

  logShot(x, y, hitStatus, 'computer');
  if (hitStatus) {
    drawHit(cell);
    if (didSink(x, y, playerIBoard, 'player')) {
      logSink(playerIBoard[x][y].shipType, 'opponent');
      displaySink(playerIBoard[x][y].shipType, 'player');
      playerShips--;
      if (playerShips < 1) {
        gameOver();
      }
    }
  } else {
    drawMiss(cell);
  }
  $("#currentPlayer").text('Player');
  currentTurn = 'player';
};

const didSink = function(x, y, targetBoard, targetPlayer) {

  if (SHIPS[targetBoard[x][y].shipType][targetPlayer].hp === 0) return true;
  return false;
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

// DEPRECATED FOR LOCAL GAME TYPE.
// These functions will likely be used if I overhaul the code to allow for multiplayer
// As it stands, they can be ignored.

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
