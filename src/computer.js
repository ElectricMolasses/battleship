// Logic for computer opponent in battleship.

const dumbPlacement = function() {

};

const dumbShot = function(board, player) {
  let randomX;
  let randomY;
  do  {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
  } while (wasShot(randomX, randomY));
  
  return [randomX, randomY, fire(randomX, randomY, board, player)];
};