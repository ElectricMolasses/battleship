const drawGrid = function(element) {
  const gridWidth = element.innerWidth();
  const gridHeight = element.innerHeight();

  const cellRows = [];
  const cells = [];
  
  console.log(`Width: ${gridWidth} Height: ${gridHeight}`);
  
  for (let i = 0; i < 10; i++) {
    cells.push([]);
    cellRows.push($('<div></div>').width(gridWidth)
      .height(gridHeight / 10)
      .addClass('rowContainer')
      .attr('id', `gridRow${i}`));
    element.append(cellRows[i]);

    for (let j = 0; j < 10; j++) {
      cells[i].push($('<div></div>').width(gridWidth / 10)
        .height(gridHeight / 10)
        .addClass('cell')
        .attr('id', `cell${j}-${i}`)
        .click(() => {
          //Test method, will have to sent shot requests to game engine.
          drawMiss($(`#cell${j}-${i}`));
        }));
      cellRows[i].append(cells[i][j]);
    }
  }
};

const drawShip = function(cell) {

};

// Yet to determine whether it takes a ship or a cell.
const eraseShip = function() {

};

const fireOnCell = function(cell) {
  
};

const drawHit = function(cell) {
  cell.append($('<img src="./assets/Fire/fire" alt="hit">')
    .addClass('cellImage'));
};

const drawMiss = function(cell) {
  cell.append($('<img src="./assets/Splash/splash" alt="hit">')
    .addClass('cellImage')
    .css('mix-blend-mode', 'multiply'));
};

$(function() {
  const gridContainer = $('#grid');
  drawGrid(gridContainer);
});
