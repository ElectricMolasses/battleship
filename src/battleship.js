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
  // Check if index out of bounds.
  if (x < 0 || x > board.length ||
      y < 0 || y > board[x].length) {
    return false;
  }

  // Check if tail of ship is out of bounds
  if (orientation === 'horizontal') {
    if (x + SHIPS[ship].length > board.length) {
      return false;
    }
  } else if (orientation === 'vertical') {
    if (y + SHIPS[ship].length > board[x].length) {
      return false;
    }
  }
  
  // Check if the ship overlaps with another ship.
  
  // Place the ship
  if (player === 'player' || player === 'computer') {
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
  placeShip
};