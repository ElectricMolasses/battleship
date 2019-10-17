const chai = require('chai');
const assert = chai.assert;

const main = require('../src/battleship');

it('createBoard should have an array of length 10, containing 10 objects', function() {
  const board = main.createBoard();
  assert(board.length === 10 && board[9].length === 10);
});

it('placeShip should return true if the ship placement is valid and ship is not already placed');

it('placeShip should return false if the ship has already been places');

it('placeShip should throw an error for out of bounds index, if the coordinates are not within board restrictions');

it('placeShip should return false if part of the ship would be off the grid');

it('placeShip should return false if any part of the ship overlaps with another ship');

it('doesHit should return true when firing on a cell occupied by a ship.');