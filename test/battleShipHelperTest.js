const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const main = require('../src/battleship');
const {
  SHIPS,
  createBoard,
  placeShip,
  removeShip,
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  isOrientationValid,
  doesShipOverlap,
  fire,
} = main;