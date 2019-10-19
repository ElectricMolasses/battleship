const SHIPS = {
  carrier: {
    length: 5,
  },
  battleship: {
    length: 4,
  },
  cruiser: {
    length: 3,
  },
  submarine: {
    length: 3,
  },
  destroyer: {
    length: 2,
  }
};


const resetSHIPS = function() {
  for (let ship in SHIPS) {
    SHIPS[ship].player = {};
    SHIPS[ship].computer = {};
    SHIPS[ship].player.X = null;
    SHIPS[ship].player.Y = null;
    SHIPS[ship].computer.X = null;
    SHIPS[ship].computer.Y = null;
    SHIPS[ship].player.orientation = null;
    SHIPS[ship].computer.orientation = null;
    SHIPS[ship].player.hp = SHIPS[ship].length;
    SHIPS[ship].computer.hp = SHIPS[ship].length;
  }
};
resetSHIPS();

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
// Player will only accept 'player' or 'computer'
const placeShip = function(x, y, ship, orientation, board, player) {

  if (isShipPlaced(ship, player) ||
      !isPointValid(x, y, board) ||
      !isShipTailValid(x, y, ship, orientation, board) ||
      doesShipOverlap(x, y, ship, orientation, board) ||
      !isOrientationValid(orientation)) return false;
  
  if (!isPlayerValid(player)) throw Error("Invalid player argument");
  
  setShipCoords(x, y, ship, orientation, player);
  for (let i = 0; i < SHIPS[ship].length; i++) {
    if (orientation === 'horizontal') {
      board[x + i][y].shipType = ship;
    } else {
      board[x][y + i].shipType = ship;
    }
  }
  return true;
};

const removeShip = function(ship, board, player) {
  if (!isShipPlaced(ship, player)) return false;

  let orientation = SHIPS[ship][player].orientation;
  let x = SHIPS[ship][player].X;
  let y = SHIPS[ship][player].Y;

  for (let i = 0; i < SHIPS[ship].length; i++) {
    if (orientation === 'horizontal') {
      board[x + i][y].shipType = null;
    } else {
      board[x][y + i].shipType = null;
    }
  }
  clearShipCoords(ship, player);

  return true;
};

const setShipCoords = function(x, y, ship, orientation, player) {
  SHIPS[ship][player].X = x;
  SHIPS[ship][player].Y = y;
  SHIPS[ship][player].orientation = orientation;
};

const clearShipCoords = function(ship, player) {
  SHIPS[ship][player].X = null;
  SHIPS[ship][player].Y = null;
  SHIPS[ship][player].orientation = null;
};

const isShipPlaced = function(ship, player) {
  return SHIPS[ship][player].X !== null;
};

const isShipTailValid = function(x, y, ship, orientation, board) {
  if (orientation === 'horizontal') {
    if (x + SHIPS[ship].length > board.length) {
      return false;
    }
  } else if (orientation === 'vertical') {
    if (y + SHIPS[ship].length > board[x].length) {
      return false;
    }
  }
  return true;
};

const doesShipOverlap = function(x, y, ship, orientation, board) {
  for (let i = 0; i < SHIPS[ship].length; i++) {
    if (orientation === 'horizontal') {
      if (board[x + i][y].shipType !== null) return true;
    } else {
      if (board[x][y + i].shipType !== null) return true;
    }
  }
  return false;
};

const isPointValid = function(x, y, board) {
  return x < board.length && y < board[x].length;
};

const isPlayerValid = function(player) {
  return (player === "player" || player === "computer");
  // Consider making this throw an error for clarity later.
};

const isOrientationValid = function(orientation) {
  return (orientation === "horizontal" || orientation === "vertical");
};

const fire = function(x, y, board, targetPlayer) {

  const ship = board[x][y].shipType;

  hitCell(x, y, board);

  if (ship !== null) {
    reduceHP(ship, targetPlayer);
    return true;
  }
  return false;
};

const reduceHP = function(ship, player) {
  //if (SHIPS[ship][player].hp !== null) return false;
  //if (SHIPS[ship][player].hp > 0) return false;
  SHIPS[ship][player].hp--;
};

const hitCell = function(x, y, board) {
  board[x][y].wasShot = true;
};

const isOccupied = function(x, y, board) {
  return board[x][y].shipType !== null;
};

const shipsList = function(player) {
  const shipsList = {};

  for (const ship in SHIPS) {
    shipsList[ship] = SHIPS[ship][player].hp;
  }

  return shipsList;
};

const logShot = function(x, y, hitStatus, player) {
  console.log(`${player} shoots at ${convertCellName(x,y)}: ${
    hitStatus ? 'HIT' : 'MISS'
  }`);
};

const convertCellName = function(x, y) {
  return `${String.fromCharCode(65 + x)}${y + 1}`;
};

// Start game will handle the game loop, created boards for both players, and
// allow interactions to begin.  It will ONLY handle the game logic, actual
// user input will be processed from the main function.
/*
const startGame = function() {
  const playerBoard = createBoard();
  const computerBoard = createBoard();

  let playing = true;
  let matchOngoing = 'false';

  // Determine who goes first.

  let turn = 'player';
  let currentBoard = playerBoard;
  
  while (playing) {
    // Ship placement will be INSIDE this loop to allow for a replay option.

    while (matchOngoing) {
      // Turns happen one by one in this loop, and
      // turn gets swapped between player and computer
      // at the end.
    }

  }
  
};
*/

module.exports = {
  SHIPS,
  resetSHIPS,
  createBoard,
  placeShip,
  removeShip,
  shipsList,
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  isOrientationValid,
  doesShipOverlap,
  setShipCoords,
  clearShipCoords,
  fire,
  reduceHP,
  hitCell,
  isOccupied,
  logShot,
  convertCellName,
};