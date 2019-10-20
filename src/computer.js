// Logic for computer opponent in battleship.

const dumbPlacement = function() {

};

const dumbShot = function(board, player) {
  let randomX;
  let randomY;
  console.log(board);
  do  {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
  } while (board[randomX][randomY].wasShot);
  
  return [randomX, randomY, fire(randomX, randomY, board, player)];
};