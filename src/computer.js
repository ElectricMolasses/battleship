// Logic for computer opponent in battleship.

const dumbPlacement = function(board, player) {
  const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
  let randomX;
  let randomY;
  let randomOrientation;

  for (const ship of ships) {
    do {
      randomX = Math.floor(Math.random() * (10 - SHIPS[ship].length));
      randomY = Math.floor(Math.random() * (10 - SHIPS[ship].length));
      Math.round(Math.random()) === 1 ? randomOrientation = 'horizontal' :
        randomOrientation = 'vertical';

    } while (!placeShip(randomX, randomY, ship, randomOrientation, board, player));
  }
};

const dumbShot = function(board, player) {
  let randomX;
  let randomY;

  do  {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
  } while (board[randomX][randomY].wasShot);
  return [randomX, randomY, fire(randomX, randomY, board, player)];
};

const okayShot = function(board, player, memory) {
  let shotX;
  let shotY;
  let result;

  if (memory.length < 1) {
    [shotX, shotY] = dumbShot(board, player);
    memory.push(shotX, shotY);
  } else if (memory.length === 1) {
    let firstHit = [memory[0][0], memory[0][1]];
    let possibleHits = [[firstHit[0] - 1, firstHit[1]],
      [firstHit[0] + 1, firstHit[1]],
      [firstHit[0], firstHit[1] - 1],
      [firstHit[0], firstHit[1] + 1]];
    do {
      [shotX, shotY] = possibleHits[Math.floor(Math.random() * possibleHits.length)];
    } while (board[shotX][shotY].wasShot ||
      shotX > 9 || shotX < 0 ||
      shotY > 9 || shotY < 0);

    result = fire(shotX, shotY, board, player);
    if (result) {
      memory.push([shotX, shotY]);
    }
  } else {
    let lowX, highX = memory[0][0];
    let lowY, highY = memory[0][1];

    // This will give us a box that contains all current pending hits.
    for (const point in memory) {
      if (point[0] < lowX) lowX = point[0];
      if (point[0] > highX) highX = point[0];
      if (point[1] < lowY) lowY = point[1];
      if (point[1] > highY) highY = point[1];
    }
  }

  // Functions to confirm a potential line/ship is not broken by a miss.
  const verifyVerticalLine = function(x, y1, y2, board) {
    for (let i = y1; i <= y2; i++) {
      if (!board[x][i].wasShot) {
        return false;
      }
    }
    return true;
  };

  const verifyHorizontalLine = function(y, x1, x2, board) {
    for (let i = x1; i <= x2; i++) {
      if (!board[i][y].wasShot) {
        return false;
      }
    }
    return true;
  };

  return [shotX, shotY, result];
};