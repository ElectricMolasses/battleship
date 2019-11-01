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

  if (memory.length < 1) {
    [shotX, shotY] = dumbShot(board, player);
  } else if (memory.length === 1) {
    let firstHit = [memory[0][0], memory[0][1]];
    let possibleHits = [[firstHit[0] - 1, firstHit[1]],
      [firstHit[0] + 1, firstHit[1]],
      [firstHit[0], firstHit[1] - 1],
      [firstHit[0], firstHit[1] + 1]];
    
    do {
      [shotX, shotY] = Math.floor(Math.random() * possibleHits.length);
    } while (board[shotX][shotY].wasShot ||
      shotX > 9 || shotX < 0 ||
      shotY > 9 || shotY < 0);
  } else {

  }

  return [shotX, shotY, fire(shotX, shotY, board, player)];
};