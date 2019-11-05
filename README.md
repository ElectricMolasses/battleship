# Battleship

Web application that lets you play battleship.

## Known Bugs

- Currently a bug where the player can remove event listeners from the opponents grid before the game starts.

## Roadmap

### Functional

- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Allow the player to start a new game.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Allow the player to take a shot on their turn only.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Allow the player to play against an AI.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Have a leaderboard for games against the AI.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Ships on the status bar change appearance once the have been sunk.
- ![#f03c15](https://placehold.it/15/c08c15/000000?text=+) Allow the player to pick between different levels of AI difficulty (Stretch).

### Display

- ![#46B308](https://placehold.it/15/46B308/000000?text=+) Players should be able to see the other players board and their own.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) The players own board should show the following:
  - ![#46B308](https://placehold.it/15/46B308/000000?text=+) The players ship placement.
  - ![#46B308](https://placehold.it/15/46B308/000000?text=+) Any shots the opposing player has made.
- ![#46B308](https://placehold.it/15/46B308/000000?text=+) The opponents board should show the following:
  - ![#46B308](https://placehold.it/15/46B308/000000?text=+) Any shots made by the player, and whether a HIT or a MISS.
- ![#f03c15](https://placehold.it/15/46B308/000000?text=+)  Both boards should show:
  - ![#f03c15](https://placehold.it/15/46B308/000000?text=+) Coordinates of the cells, up to you on how this should be displayed.

## Dependencies

Mocha and chai is used for testing, everything else is pure javasript.  No additional libraries needed to run.

## Getting Started

- Just launch index.html, multiplayer is not yet implemented so the game does not require a server to run.

## Usage

### Placement

The game starts in placement mode.  Click the ship you would like to place on the left, and click the button below your ships to change the current orientation it will place at.
The ship will always place the upper left section of the ship on the cell you click.
You can click on a ship you've placed on the left to remove it, allowing you to move it somewhere else.
There are not yet UI elements to indicate which ships have been placed, or which ship is currently selected.

### Active Match

Currently, the player will always go before the computer.
Click on an enemy cell to fire at that cell, provided it is your turn.  There is text to the left to indicate whose turn it is.  The computer will automatically pick up its turn and fire after you do.

### Game Over

Once the player or the computer wins, a scoreboard will appear displaying the players win loss with a play again button.

### Restart

At any point, the player can click "new game" on the left to reset the match.  It will provide a prompt to approve the reset in case of a misclick.

## Values

### Entity Objects

#### playerShips/computerShips{}

An object containing ship objects, to track whether or not they've been placed yet, and their start coordinate/alignment for the purpose of removal.
This **could** be used to track hits/misses as well, rather than tracking it directly inside the board.

## Functions

Functionality is split between three main areas.

#### battleship.js

Contains the basegame logic, ability to track board state and ship health ability to fire on cells.  Completely separate from the front end where it will actually draw the results of game logic.

#### interface.js

The middle man that takes requests from the front end system and speaks to the game logic to negotiate whether or not moves are valid, and what happens when a valid move is provided.

#### main.js

The front end engine, handles drawing player boards and updating elements to reflect the current state of the game.  Also handles adding click listeners to send requests to the interface so the user can actually play.

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