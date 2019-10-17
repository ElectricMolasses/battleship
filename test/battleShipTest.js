const chai = require('chai');
const assert = chai.assert;

const main = require('../src/battleship');

it('createBoard should have an array of length 10, containing 10 objects', function() {
  const board = main.createBoard();
  assert(board.length === 10 && board[9].length === 10);
});