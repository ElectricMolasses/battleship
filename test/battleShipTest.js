const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
require('mocha-sinon'); // For console.log verification.

const main = require('../src/battleship');
const {
  SHIPS,
  resetSHIPS,
  createBoard,
  placeShip,
  removeShip,
  fire,
  logShot,
} = main;
let board;

describe('Main Functions', () => {
  describe('SHIPS', () => {
    it('should contain playerX/Y and computerX/Y as null from launch', () => {
      assert.isNull(SHIPS.cruiser.player.X);
    });
  });

  describe('createBoard', () => {
    beforeEach(() => board = createBoard());
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
    afterEach(() => resetSHIPS());

    it('should return true if the ship placement is valid and ship is not already placed', () => {
      assert.isTrue(placeShip(2, 4, 'cruiser', 'horizontal', board, 'player'));
    });

    it('should change the board state to reflect the cells the ship occupies', () => {
      placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
      assert.isTrue(board[1][1].shipType === 'carrier' &&
                    board[2][1].shipType === 'carrier' &&
                    board[3][1].shipType === 'carrier' &&
                    board[4][1].shipType === 'carrier' &&
                    board[4][1].shipType === 'carrier');
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
    beforeEach(() => board = createBoard());
    afterEach(() => resetSHIPS);
    it('should return true if the ship was on the board, and successfully removed', () => {
      placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
      assert.isTrue(removeShip('carrier', board, 'player'));
    });

    it('should return false if the ship was not already placed', () => {
      assert.isFalse(removeShip('destroyer', board, 'player'));
    });
  });

  describe('fire', () => {
    beforeEach(() => board = createBoard());
    afterEach(() => resetSHIPS());

    it('should return true when firing on a cell occupied by a ship.', () => {
      placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
      assert.isTrue(fire(2, 1, board, 'player'));
    });

    it('should modify the hit points of that ship on a hit.', () => {
      placeShip(1, 1, 'carrier', 'horizontal', board, 'player');
      fire(1, 1, board, 'player');
      assert.equal(SHIPS.carrier.player.hp, 4);
    });

    it('should change the wasShot property of that cell on a hit.', () => {
      placeShip(2, 3, 'carrier', 'horizontal', board, 'player');
      fire(4, 3, board, 'player');
      assert.equal(board[4][3].wasShot, true);
    });

    it('should change the wasShot property of that cell on a miss.', () => {
      fire(4, 3, board, 'player');
      assert.equal(board[4][3].wasShot, true);
    });

    it('should return false when firing on a cell that is not occupied by a ship.', () => {
      assert.isFalse(fire(4, 3, board, 'player'));
    });

    it('should throw an Error when targeting an out of bounds cell', () => {
      expect(fire.bind(20, 20, board, 'player')).to.throw(Error);
    });

    it('should throw an Error when attempting to fire on a cell already fired on', () => {
      fire(3, 3, board, 'player');
      expect(fire.bind(3, 3, board, 'player')).to.throw(Error);
    });
  });

  describe('logShot', () => {
    // AHHHHHHHHHH
    beforeEach(function() {
      let log = console.log;
      this.sinon.stub(console, 'log').callsFake(() => {
        return log.apply(log, arguments);
      });
    });

    it('should dispay a message with the players name, where they fired, and that the shot landed.', () => {
      logShot(2, 7, true, 'player');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(`player shoots at C8: HIT`)).to.be.true;
    });

    it('should display a message with the computers name, where they fired, and that the shot missed.', () => {
      logShot(3, 2, false, 'computer');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(`computer shoots at D3: MISS`)).to.be.true;
    });
    /*
    it('should dispay a message with the computers name, where they fired, an whether or not the shot landed.', () => {
      assert.equal(logShot(3, 2, false, 'computer'), `computer shoots at D3: MISS`);
    });*/
  });
});