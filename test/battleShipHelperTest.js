const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const main = require('../src/battleship');
const {
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  isOrientationValid,
  doesShipOverlap,
  setShipCoords,
  clearShipCoords,
} = main;

describe('Helper Functions', () => {
  describe('isPlayerValid', () => {
    it('should return true if the player is "player"', () =>{
      assert.isTrue(isPlayerValid("player"));
    });
  });

  describe('isShipPlaced', () => {
    
  });

  describe('isPointValid', () => {

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