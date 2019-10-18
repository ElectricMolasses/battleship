const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

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
} = main;

let board;

describe('Helper Functions', () => {
  describe('isPlayerValid', () => {
    it('should return true if the player is "player"', () =>{
      assert.isTrue(isPlayerValid("player"));
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

  });

  describe('isOrientationValid', () => {

  });

  describe('doesShipOverlap', () => {

  });

  describe('setShipCoords', () => {

  });

  describe('clearShipCoords', () => {

  });
});