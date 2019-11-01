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

    result = fire(shotX, shotY, board, player)
    if (result) {
      memory.push([shotX, shotY]);
    }
  } else {
    // Hm.
    /*
      Three shots is guaranteed to determine the direction of an already hit ship, whether or not they land.  At this point, we will have at least two confirmed shots anyway, the fourth hit being a guarantee does not matter.

      Once we have two shots, we need a way to deal with the second shot and on potentially landing on different ships.
      Avoid passing the ship that was hit to the AI if possible.  This isn't functionally neccesary, but it's a better problem to solve.

      Memory will hold shots that have landed on a ship that has not yet sunk.
      We can clear out shots on a ship that we know we've sunk.

      They player gets information on the type of ship they have sunk, so the AI should be allowed to have this information too.

      The function returns the result of it firing so the player can mark a miss or hit on their board, but we can call it before the return and store that result in a variable, handle it, THEN return the result to the player.
      ::Refactored below to show such.

      When the computer is told whether or not a ship was sunk, and which ship, the only "effective" information it receives is the length of the ship it sunk.  It needs to determine which set of cells were actually sunk, as WELL as which ones are overlap of other ships and need to stay.  There are conditions where this is IMPOSSIBLE.  How do I work around that restriction?  We'd need to cache certain remembered cells as possibly being overlap, an remove them as we sink other ships.
    */
  }

  return [shotX, shotY, result];
};