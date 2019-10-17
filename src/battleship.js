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
  SHIPS[ship].playerX = null;
  SHIPS[ship].playerY = null;
  SHIPS[ship].computerX = null;
  SHIPS[ship].computerY = null;
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
const placeShip = function(x, y, ship, orientation, board) {
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