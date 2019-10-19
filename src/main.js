const SHIP_IMAGES = {
  carrier: {
    horizontal: './assets/Carrier/rotated-ShipCarrierHull.png',
    vertical: './assets/Carrier/ShipCarrierHull.png'
  },
  battleship: {
    horizontal: '',
    vertical: ''
  },
  cruiser: {
    horizontal: '',
    vertical: ''
  },
  submarine: {
    horizontal: '',
    vertical: ''
  },
  destroyer: {
    horizontal: '',
    vertical: ''
  }
};

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
          drawShip($(`#cell${j}-${i}`), 'carrier');
        }));
      cellRows[i].append(cells[i][j]);
    }
  }
};

const drawShip = function(cell, ship) {
  if (ship === 'carrier') {
    cell.append($('<img src="./assets/Carrier/rotated-ShipCarrierHull.png" alt="carrier">')
      .attr('id', 'carrierImage'));
  }
  if (ship === 'battleship') {

  }
  if (ship === 'cruiser') {

  }
  if (ship === 'submarine') {

  }
  if (ship === 'destroyer') {

  }
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
