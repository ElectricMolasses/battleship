# Battleship

Web application that lets you play battleship.

## ToDo

- Refactor to actually use isOccupied
- I believe the core functionality is done and we can begin implementing steps in the game loop.

## Dependencies

Mocha and chai is used for testing, everything else is pure javasript.  No additional libraries needed to run.

For quick reference, you can install these modules using the following command.

```
npm install mocha chai --save-dev
```

## Values

### Entity Objects

#### playerShips/computerShips{}

An object containing ship objects, to track whether or not they've been placed yet, and their start coordinate/alignment for the purpose of removal.
This **could** be used to track hits/misses as well, rather than tracking it directly inside the board.

## Functions

### The Board

The board is designed as an array of objects, where the objects track state.  You can pull whether or not that cell contains a ship, as well as whether or not a cell has been hit through the object properties.  Ships are not their own objects, only properties spread across multiple cells.

#### createBoard()

Generates an empty, 10 x 10 array of objects.  Will initialize the default properties for each of them to avoid undefined returns when making calls.

#### placeShip(x, y, ship)

Allows the user to place a ship onto their board.  Internally will take the upper left coordinate of placement and orientation, will return true or false as to whether or not placement is possible (Part of the ship out of bounds.)  Will likely flag a global value to let the game know that ship has been placed.

#### removeShip(ship)

Takes a ship to remove, find the cells containing that ship in the board objects, and then sets them to no longer contain that ship.  Will likely have to flag a global value to let the game know that ship is now free for placement again.

#### doesHit(x, y)

Takes a coordinate to confirm whether or not a shot hits.  Will apply the hit property to the cell and call any functions required to show a hit/miss.

#### logShotResult(x, y, hits)

Takes the information for the last shot, formats it as such:
```
Player 1 shoots at A1: HIT
Player 2 shoots at B5: MISS
Player 1 shoots at A3: HIT
Player 1 has sunk a submarine!
```
And logs it to console.

### The Computer

List of functions regarding AI gameplay.

### The Browser

#### fire(x, y)

Will have to take input (most likely a click on a cell), and pass that to the game logic to run the players turn.

#### updateCell()

Updates a cell on either board to display a hit or a miss.  This function will be called by the game logic after `fire()` evaluation, or on the computers turn.

#### drawShip(x, y, ship)

Updates display to show a ship the player has placed.

#### eraseShip(ship)

Removes a ship the player has picked back up from the display.