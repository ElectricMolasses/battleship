const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const main = require('../src/battleship');
const SHIPS = main.SHIPS;
const createBoard = main.createBoard;
const placeShip = main.placeShip;

it('SHIPS should contain playerX/Y and computerX/Y as null from launch', function() {
  assert.isNull(SHIPS.cruiser.player.X);
});

it('createBoard should have an array of length 10, containing 10 objects', function() {
  const board = createBoard();
  assert(board.length === 10 && board[9].length === 10);
});

it('createBoard cells should contain the property shipType', function() {
  const board = createBoard();
  assert(board[4][8].shipType !== undefined);
});

it('createBoard cells should contain the property shipOrientation if shipType is not null');
// ^^^ Might not need this, using pointers to other cells to more easily navigate cells containing the ship.

it('createBoard cells should contain the property wasShot');

it('placeShip should return true if the ship placement is valid and ship is not already placed', function() {
  const board = createBoard();
  assert.isTrue(placeShip(2, 4, 'cruiser', 'horizontal', board, 'player'));
});

it('placeShip should return false if the ship has already been places');

it('placeShip should return false for out of bounds index, if the coordinates are not within board restrictions', function() {
  const board = createBoard();

  assert.isFalse(placeShip(1, 22, 'destroyer', 'horizontal', board, 'player'));
});

it('placeShip should return false if part of the ship would be off the grid horizontally', function() {
  const board = createBoard();

  assert.isFalse(placeShip(6, 6, 'carrier', 'horizontal', board, 'player'));
});

it('placeShip should return false if part of the ship would be off the grid vertically', function() {
  const board = createBoard();

  assert.isFalse(placeShip(8, 7, 'carrier', 'vertical', board, 'player'));
});

it('placeShip should return false if any part of the ship overlaps with another ship');

it('placeShip should throw an error if the player argument is not "player" or "computer"', function() {
  const board = createBoard();

  expect(placeShip.bind(1, 1, 'carrier', 'vertical', board, 'bob')).to.throw(Error);
});

it('removeShip should return true if the ship was on the board, and successfully removed');

it('removeShip should return false if the ship was not already placed');

it('doesHit should return true when firing on a cell occupied by a ship.');

it('doesHit should return false when firing on a cell that is not occupied by a ship.');

it('doesHit should throw an Error when targeting an out of bounds cell');

it('doesHit should throw an error when attempting to fire on a cell already fired on');