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
    // The fun stuff.  Intelligent shot choices once there are more than two pending shots on the board.

    let lowX, highX = memory[0][0];
    let lowY, highY = memory[0][1];

    // This will give us a box that contains all current pending hits.
    for (const point in memory) {
      if (point[0] < lowX) lowX = point[0];
      if (point[0] > highX) highX = point[0];
      if (point[1] < lowY) lowY = point[1];
      if (point[1] > highY) highY = point[1];
    }

    if (lowX === highX) {
      if (!board[lowX][highY + 1].wasShot) {
        result = fire(lowX, highY + 1, board, player);
        return [lowX, highY + 1, result];
      }
      if (!board[lowX][lowY - 1].wasShot) {
        result = fire(lowX, lowY - 1, board, player);
        return [lowX, lowY - 1, result];
      }
    }

    if (lowY === highY) {
      if (!board[highX + 1][lowY].wasShot) {
        result = fire(highX + 1, lowY, board, player);
        return [highX + 1, lowY, result];
      }
      if (!board[lowX - 1][lowY].wasShot) {
        result = fire(lowX - 1, lowY, result);
        return [lowX - 1, lowY, result];
      }
    }

    for (let i = lowX; i <= highX; i++) {
      for (let j = lowY; j <= highY; j++) {
        if (!board[i + 1][j].wasShot) {
          result = fire(i + 1, j, board, player);
          return [i + 1, j, result];
        }
        if (!board[i - 1][j].wasShot) {
          result = fire(i - 1, j, board, player);
          return [i - 1, j, result];
        }
        if (!board[i][j + 1].wasShot) {
          result = fire(i, j + 1, board, player);
          return [i, j + 1, result];
        }
        if (!board[i][j - 1].wasShot) {
          result = fire(i, j - 1, board, player);
          return [i, j - 1, result];
        }
      }
    }
  }

  return [shotX, shotY, result];
};