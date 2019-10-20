// Logic for computer opponent in battleship.

const dumbPlacement = function(board, player) {
  const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
  let randomX;
  let randomY;
  let randomOrientation;

  for (const ship of ships) {
    do {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      Math.round(Math.random) ? randomOrientation = 'horizontal' : 
        randomOrientation = 'vertical';
      console.log(`RandomX: ${randomX}`);
      console.log(`RandomY: ${randomY}`);
      console.log(`RandomOrientation: ${randomOrientation}`);
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