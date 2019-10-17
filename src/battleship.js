const createBoard = function() {
  let board = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({});
    }
  }

  return board;
};

module.exports = {
  createBoard
};