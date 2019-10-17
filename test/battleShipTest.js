const chai = require('chai');
const assert = chai.assert;

const main = require('../src/battleship');

it('createBoard should have an array of length 10, containing 10 objects', function() {
  const board = main.createBoard();
  assert(board.length === 10 && board[9].length === 10);
});

it('createBoard cells should contain the property shipType', function() {
  const board = main.createBoard();

});

it('createBoard cells should contain the property shipOrientation if shipType is not null');

it('createBoard cells should contain the property shipConnections, and it should be an array of no greater than 2, if shipType does not equal null');

it('createBoard cells shipConnections property should not have a length greater than 0 if shipType is null');

it('createBoard cells should contain the property wasShot');

it('placeShip should return true if the ship placement is valid and ship is not already placed');

it('placeShip should return false if the ship has already been places');

it('placeShip should throw an error for out of bounds index, if the coordinates are not within board restrictions');

it('placeShip should return false if part of the ship would be off the grid');

it('placeShip should return false if any part of the ship overlaps with another ship');

it('removeShip should return true if the ship was on the board, and successfully removed');

it('removeShip should return false if the ship was not already placed');

it('doesHit should return true when firing on a cell occupied by a ship.');

it('doesHit should return false when firing on a cell that is not occupied by a ship.');

it('doesHit should throw an Error when targeting an out of bounds cell');

it('doesHit should throw an error when attempting to fire on a cell already fired on');