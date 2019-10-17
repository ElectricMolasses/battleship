const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const main = require('../src/battleship');
const {
  SHIPS,
  resetSHIPS,
  createBoard,
  placeShip,
  removeShip,
  fire,
} = main;
let board;

describe('SHIPS', () => {
  it('SHIPS should contain playerX/Y and computerX/Y as null from launch', () => {
    assert.isNull(SHIPS.cruiser.player.X);
  });
});

describe('createBoard', () => {
  before(() => board = createBoard());
  it('should have an array of length 10, containing 10 objects', () => {
    assert(board.length === 10 && board[9].length === 10);
  });

  it('cells should contain the property shipType', () => {
    assert(board[4][8].shipType !== undefined);
  });

  it('cells should instantiate with wasShot = false', () => {
    assert.isFalse(board[1][6].wasShot);
  });
});

describe('placeShip', () => {
  beforeEach(() => board = createBoard());

  it('should return true if the ship placement is valid and ship is not already placed', () => {
    assert.isTrue(placeShip(2, 4, 'cruiser', 'horizontal', board, 'player'));
  });

  it('should return false if the ship has already been placed', () => {
    placeShip(2, 4, 'cruiser', 'horizontal', board, 'player');
    assert.isFalse(placeShip(1, 4, 'cruiser', 'horizontal', board, 'player'));
  });

  it('should return false for out of bounds index, if the coordinates are not within board restrictions', () => {
    assert.isFalse(placeShip(1, 22, 'destroyer', 'horizontal', board, 'player'));
  });

  it('should return false if part of the ship would be off the grid horizontally', () => {
    assert.isFalse(placeShip(6, 6, 'carrier', 'horizontal', board, 'player'));
  });

  it('should return false if part of the ship would be off the grid vertically', () => {
    assert.isFalse(placeShip(8, 7, 'carrier', 'vertical', board, 'player'));
  });

  it('should return false if any part of the ship overlaps with another ship', () => {
    placeShip(3, 3, 'carrier', 'vertical', board, 'player');
    assert.isFalse(placeShip(3, 3, 'destroyer', 'horizontal', board, 'player'));
  });

  it('should throw an error if the player argument is not "player" or "computer"', () => {
    expect(placeShip.bind(1, 1, 'carrier', 'vertical', board, 'bob')).to.throw(Error);
  });
});

describe('removeShip', () => {
  before(() => board = createBoard());
  it('should return true if the ship was on the board, and successfully removed', () => {
    placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
    assert.isTrue(removeShip('carrier', board, 'player'));
  });

  it('should return false if the ship was not already placed', () => {
    assert.isFalse(removeShip('destroyer', board, 'player'));
  });
});

describe('doesHit', () => {
  before(() => board = createBoard());

  it('should return true when firing on a cell occupied by a ship.', () => {
    placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
    assert.isTrue(fire(1, 1, board, 'player'));
  });

  it('should change the wasShot property of that cell on a hit.', () => {
    placeShip(2, 3, 'carrier', 'horizontal', board, 'player');
    fire(4, 3, board, 'player');
    assert(board[4][3].wasShot === true);
  });

  it('should change the wasShot property of that cell on a miss.', () => {
    fire(4, 3, board, 'player');
    assert(board[4][3].wasShot === true);
  });

  it('should return false when firing on a cell that is not occupied by a ship.', () => {
    assert.isFalse(fire(4, 3, board, 'player'));
  });

  it('should throw an Error when targeting an out of bounds cell', () => {
    expect(fire(20, 20, board, 'player')).to.throw(Error);
  });

  it('should throw an Error when attempting to fire on a cell already fired on', () => {
    fire(3, 3, board, 'player');
    expect(fire(3, 3, board, 'player')).to.throw(Error);
  });
});