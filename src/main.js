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

let currentShip = 'carrier';
let currentOrientation = 'horizontal';
let boardIds = [];
let playerBoard;
let opponentBoard;

const storeId = function(id) {
  boardIds.push(id);
};

const genBoardId = function() {
  return Math.ceil(Math.random() * 10000);
};

// drawGrid will take callbacks in addition to the element it's targetting,
// and apply the callbacks to each cell of the grid under a .click() event.
const drawGrid = function(element) {
  const callbacks = Array.prototype.slice.call(arguments, 1);
  //Remove named param's from the arguments object for later use.

  const gridWidth = element.innerWidth();
  const gridHeight = element.innerHeight();

  const cellRows = [];
  const cells = [];

  const boardId = genBoardId();
  storeId(boardId);
  
  for (let i = 0; i < 10; i++) {
    cells.push([]);
    cellRows.push($('<div></div>').width(gridWidth)
      .height(gridHeight / 10)
      .addClass('rowContainer')
      .attr('id', `${boardId}gridRow${i}`));
    element.append(cellRows[i]);

    for (let j = 0; j < 10; j++) {
      cells[i].push($('<div></div>').width(gridWidth / 10)
        .height(gridHeight / 10)
        .addClass('cell')
        .attr('id', `${boardId}cell${j}-${i}`)
        .click(() => {
          for (const func of callbacks) {
            func($(`#${boardId}cell${j}-${i}`));
          }
          
        }));
      cellRows[i].append(cells[i][j]);
    }
  }
};

const removeAfterClick = function(cell) {
  cell.prop("onclick", null).off("click");
};

const convertCellToCoords = function(cell) {
  // Index will always be the same in cells, regex for practice.
  const x = Number(cell.attr('id').match(/\d(?=-)/)[0]);
  const y = Number(cell.attr('id').match(/\d$/)[0]);
  return [
    x,
    y
  ];
};

const convertCoordsToCell = function(x, y, id) {
  return $(`#${id}cell${x}-${y}`);
};

const drawShip = function(cell) {
  const [x, y] = convertCellToCoords(cell);
  const ship = currentShip;
  const orientation = currentOrientation;

  if (!requestPlaceShip(x, y, ship, orientation)) {
    return;
  }

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
const eraseShip = function(ship) {
  if (!requestRemoveShip(ship)) return false;
  $(`#${ship}ImageH`).remove();
  $(`#${ship}ImageV`).remove();
};

const fireOnCell = function(cell) {
  const [x, y] = convertCellToCoords(cell);
  let result = requestFire(x, y);
  if (result === undefined) return;
  if (result) {
    drawHit(cell);
  } else {
    drawMiss(cell);
  }
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

const resetGame = function(playerBoard, opponentBoard) {
  clearBoard(playerBoard);
  clearBoard(opponentBoard);
  drawGrid(playerBoard, drawShip);
  drawGrid(opponentBoard, fireOnCell);
};

const clearBoard = function(board) {
  console.log(board);
  $(board).empty();
};

const switchOrientation = function(button) {
  if (currentOrientation === 'horizontal') {
    currentOrientation = 'vertical';
    if (button !== undefined) button.text('vertical');
  } else {
    currentOrientation = 'horizontal';
    if (button !== undefined) button.text('horizontal');
  }
};

const linkSwitchButton = function(button) {
  button.click(() => {
    switchOrientation(button);
  });
};


const createRemoveListeners = function() {
  for (const ship in SHIP_IMAGES) {
    $(`#remove${ship}`).click(() => {
      eraseShip(ship);
      switchShip(ship);
    });
  }
};

const switchShip = function(ship) {
  currentShip = ship;
};

const nextGamePhase = function(button) {
  button.click(() => {
    if (startGame('player') === 'clearBoard') {
      console.log('trying to clear');
      clearBoard(playerBoard);
      clearBoard(opponentBoard);
      drawGrid(playerBoard, drawShip);
      drawGrid(opponentBoard, fireOnCell, removeAfterClick);  
    }
    
  });
};

$(document).ready(function() {
  playerBoard = $('#playerGrid');
  opponentBoard = $('#opponentGrid');
  drawGrid(playerBoard, drawShip);
  drawGrid(opponentBoard, fireOnCell, removeAfterClick);
  createRemoveListeners();
  linkSwitchButton($("#rotateButton"));
  nextGamePhase($('#startGame'));
  startGame('player');
});