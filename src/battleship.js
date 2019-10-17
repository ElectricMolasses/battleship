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
      !doesShipOverlap(x, y, ship, orientation, board) ||
      !isOrientationValid(orientation)) return false;
  
  if (isPlayerValid(player)) {
    SHIPS[ship][player].X = x;
    SHIPS[ship][player].Y = y;
    SHIPS[ship][player].orientation = orientation;
    for (let i = 0; i < SHIPS[ship].length; i++) {
      if (orientation === 'horizontal') {
        board[x + i][y].shipType = ship;
      } else {
        board[x][y + i].shipType = ship;
      }
    }
    return true;
  } else {
    throw Error("Invalid player argument.");
  }
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
  return true;
};

const isShipPlaced = function(ship, player) {
  return SHIPS[ship][player].X !== null;
};

const isShipTailValid = function(x, y, ship, orientation, board) {
  if (orientation === 'horizontal') {
    if (x + SHIPS[ship].length > board.length - 1) {
      return false;
    }
  } else if (orientation === 'vertical') {
    if (y + SHIPS[ship].length > board[x].length - 1) {
      return false;
    }
  }
  return true;
};

const doesShipOverlap = function(x, y, ship, orientation, board) {
  for (let i = 0; i < SHIPS[ship].length; i++) {
    for (let j = 0; j < SHIPS[ship].length; j++) {
      if (board[x + i][y + j].shipType !== null) return false;
    }
  }
  return true;
};

const isPointValid = function(x, y, board) {
  return x < board.length && y < board[x].length;
};

const isPlayerValid = function(player) {
  return (player === "player" || player === "computer");
};

const isOrientationValid = function(orientation) {
  return (orientation === "horizontal" || orientation || "vertical");
};

const fire = function(x, y, board, targetPlayer) {

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
  SHIPS,
  createBoard,
  placeShip,
  removeShip,
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  doesShipOverlap,
  fire,
};