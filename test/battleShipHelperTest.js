const chai = require('chai');
const assert = chai.assert;

const main = require('../src/battleship');
const {
  SHIPS,
  resetSHIPS,
  createBoard,
  placeShip,
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  isOrientationValid,
  doesShipOverlap,
  setShipCoords,
  clearShipCoords,
  reduceHP,
  hitCell,
  isOccupied,
  convertCellName,
} = main;

let board;

describe('Helper Functions', () => {
  describe('isPlayerValid', () => {
    it('should return true if the player is "player"', () =>{
      assert.isTrue(isPlayerValid("player"));
    });

    it('should return trueif the player is "computer"', () => {
      assert.isTrue(isPlayerValid("computer"));
    });

    it('should return false if the player is not player or computer.', () => {
      assert.isFalse(isPlayerValid('bob'));
    });
  });

  describe('isShipPlaced', () => {
    beforeEach(() => board = createBoard());
    afterEach(() => resetSHIPS());

    it('should return true if the ship has been placed', () => {
      placeShip(2, 3, 'cruiser', 'horizontal', board, 'player');
      assert.isTrue(isShipPlaced('cruiser', 'player'));
    });

    it('should return false if the ship has not been placed', () => {
      assert.isFalse(isShipPlaced('cruiser', 'player'));
    });
  });

  describe('isPointValid', () => {
    beforeEach(() => board = createBoard());

    it('should return true if the point is within bounds of board', () => {
      assert.isTrue(isPointValid(4, 9, board));
    });

    it('should return false if the point is not within bounds of board', () => {
      assert.isFalse(isPointValid(0, 10, board));
    });
  });

  describe('isShipTailValid', () => {
    before(() => board = createBoard());

    it('should return true if the ships tail is within bounds', () => {
      assert.isTrue(isShipTailValid(7, 0, 'submarine', 'horizontal', board));
    });

    it('should return false if the ships tail is out of bounds', () => {
      assert.isFalse(isShipTailValid(8, 0, 'submarine', 'horizontal', board));
    });
  });

  describe('isOrientationValid', () => {
    it('should return true if the orientation is horizontal', () => {
      assert.isTrue(isOrientationValid('horizontal'));
    });

    it('should return true if the orientation is vertical', () => {
      assert.isTrue(isOrientationValid('vertical'));
    });

    it('should return false if the orientation is not horizontal or vertical', () => {
      assert.isFalse(isOrientationValid('Horizontal'));
    });
  });

  describe('doesShipOverlap', () => {
    before(() => {
      board = createBoard();
      placeShip(1, 1, 'carrier', 'vertical', board, 'player');
    });
    after(() => resetSHIPS());

    it('should return false if the ships do not overlap', () => {
      assert.isFalse(doesShipOverlap(0, 0, 'destroyer', 'horizontal', board));
      assert.isFalse(doesShipOverlap(0, 1, 'destroyer', 'vertical', board));
      assert.isFalse(doesShipOverlap(2, 1, 'destroyer', 'vertical', board));
    });

    it('should return true if the ships do overlap', () => {
      assert.isTrue(doesShipOverlap(0, 1, 'destroyer', 'horizontal', board));
    });
  });

  describe('setShipCoords', () => {
    beforeEach(() => setShipCoords(2, 5, 'destroyer', 'horizontal', 'player'));
    afterEach(() => resetSHIPS());

    it('should store the X coordinate in the global SHIPS object.', () => {
      assert.equal(SHIPS.destroyer.player.X, 2);
    });

    it('should store the Y coordinate in the global SHIPS object.', () => {
      assert.equal(SHIPS.destroyer.player.Y, 5);
    });
  });

  describe('clearShipCoords', () => {
    beforeEach(() => {
      SHIPS.destroyer.player.X = 3;
      SHIPS.destroyer.player.Y = 0;
    });
    afterEach(() => resetSHIPS());

    it('should clear the X coordinate in the global SHIPS object.', () => {
      clearShipCoords('destroyer', 'player');
      assert.equal(SHIPS.destroyer.player.X = null);
    });

    it('should clear the Y coordinate in the global SHIPS object', () => {
      clearShipCoords('destroyer', 'player');
      assert.equal(SHIPS.destroyer.player.Y, null);
    });
  });
  
  describe('reduceHP', () => {
    afterEach(() => resetSHIPS());

    it('should reduce the hp by one if that ship has hp', () => {
      reduceHP('destroyer', 'player');
      assert.equal(SHIPS.destroyer.player.hp, 1);
    });
  });

  describe('hitCell,', () => {
    beforeEach(() => board = createBoard());
    afterEach(() => resetSHIPS());

    it('should change the property of any hit cell to true', () => {
      hitCell(1, 2, board);
      assert.equal(board[1][2].wasShot, true);
    });
  });

  describe('isOccupied', () => {
    beforeEach(() => board = createBoard());
    
    it('should return true if the target cell contains a ship', () => {
      placeShip(1, 2, 'carrier', 'horizontal', board, 'player');
      assert.isTrue(isOccupied(1, 2, board));
    });

    it('should return false if the target cell does not contain a ship', () => {
      assert.isFalse(isOccupied(4, 3, board));
    });
  });

  describe('convertCellName', () => {

    it('should convert 0,0 to A1', () => {
      assert.equal(convertCellName(0, 0), 'A1');
    });

    it(`it should convert various index's from 0-9 to A-J for x, and 1-10 for y`, () => {
      assert.equal(convertCellName(6, 5), 'G6');
      assert.equal(convertCellName(4, 7), 'E8');
      assert.equal(convertCellName(7, 2), 'H3');
      assert.equal(convertCellName(8, 7), 'I8');
      assert.equal(convertCellName(1, 3), 'B4');
      assert.equal(convertCellName(9, 9), 'J10');
    });
  });
});