const drawGrid = function(element) {
  const gridWidth = element.innerWidth();
  const gridHeight = element.innerHeight();
  

  console.log(`Width: ${gridWidth} Height: ${gridHeight}`);
};

const drawCell = function() {

};

$(function() {
  const gridContainer = $('#grid');
  drawGrid(gridContainer);
});
