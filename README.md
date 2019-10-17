# Battleship

Web application that let's you play battleship.

## Functions

### The Board

The board is designed as an array of objects, where the objects track state.  You can pull whether or not that cell contains a ship, as well as whether or not a cell has been hit through the object properties.  Ships are not their own objects, only properties spread across multiple cells.

#### createBoard()

Generates an empty, 10 x 10 array of objects.  Will initialize the default properties for each of them to avoid undefined returns when making calls.

#### placeShip()

Allows the user to place a ship onto their board.  Internally will take the upper left coordinate of placement and orientation, will return true or false as to whether or not placement is possible (Part of the ship out of bounds.)

