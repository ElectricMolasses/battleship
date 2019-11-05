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