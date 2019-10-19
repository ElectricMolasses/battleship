const SHIP_IMAGES = {
  carrier: {
    horizontal: './assets/Carrier/rotated-ShipCarrierHull.png',
    vertical: './assets/Carrier/ShipCarrierHull.png'
  },
  battleship: {
    horizontal: './assets/Battleship/rotated-ShipBattleshipHull.png',
    vertical: './assets/Battleship/ShipBattleshipHull.png'
  },
  cruiser: {
    horizontal: './assets/Cruiser/rotated-ShipCruiserHull.png',
    vertical: './assets/Cruiser/ShipCruiserHull.png'
  },
  submarine: {
    horizontal: './assets/Submarine/rotated-ShipSubMarineHull.png',
    vertical: './assets/Submarine/ShipSubMarineHull.png'
  },
  destroyer: {
    horizontal: './assets/Destroyer/rotated-ShipDestroyerHull.png',
    vertical: './assets/Destroyer/ShipDestroyerHull.png'
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
          drawShip($(`#cell${j}-${i}`), 'battleship', 'vertical');
        }));
      cellRows[i].append(cells[i][j]);
    }
  }
};

const drawShip = function(cell, ship, orientation) {
  if (ship === 'carrier') {
    if (orientation === 'horizontal') {
      cell.append($(`<img src="${SHIP_IMAGES.carrier.horizontal}" alt="carrier">`)
        .attr('id', 'carrierImageH'));
    } else {
      cell.append($(`<img src="${SHIP_IMAGES.carrier.vertical}" alt="carrier">`)
        .attr('id', 'carrierImageV'));
    }
  }
  if (ship === 'battleship') {
    if (orientation === 'horizontal') {
      cell.append($(`<img src="${SHIP_IMAGES.battleship.horizontal}" alt="carrier">`)
        .attr('id', 'battleshipImageH'));
    } else {
      cell.append($(`<img src="${SHIP_IMAGES.battleship.vertical}" alt="carrier">`)
        .attr('id', 'battleshipImageV'));
    }
  }
  if (ship === 'cruiser') {
    if (orientation === 'horizontal') {
      cell.append($(`<img src="${SHIP_IMAGES.cruiser.horizontal}" alt="carrier">`)
        .attr('id', 'cruiserImageH'));
    } else {
      cell.append($(`<img src="${SHIP_IMAGES.cruiser.vertical}" alt="carrier">`)
        .attr('id', 'cruiserImageV'));
    }
  }
  if (ship === 'submarine') {
    if (orientation === 'horizontal') {
      cell.append($(`<img src="${SHIP_IMAGES.submarine.horizontal}" alt="carrier">`)
        .attr('id', 'submarineImageH'));
    } else {
      cell.append($(`<img src="${SHIP_IMAGES.submarine.vertical}" alt="carrier">`)
        .attr('id', 'submarineImageV'));
    }
  }
  if (ship === 'destroyer') {
    if (orientation === 'horizontal') {
      cell.append($(`<img src="${SHIP_IMAGES.destroyer.horizontal}" alt="carrier">`)
        .attr('id', 'destroyerImageH'));
    } else {
      cell.append($(`<img src="${SHIP_IMAGES.destroyer.vertical}" alt="carrier">`)
        .attr('id', 'destroyerImageV'));
    }
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
