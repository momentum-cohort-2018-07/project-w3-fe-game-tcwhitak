# Exercise: alter Space Invaders

Form groups of two. Read [script.js](script.js) carefully to understand the code behind this Space Invaders clone. Then, pick one of the following things to change about the game:

* Change the color of the invaders and player. The player and the player's bullets should be a different color than the invaders.
    -added color property to each class and incorporated fill style to drawRect function

* Double the size of the player.
    -double size for player within class constructor

* Show a score equal to the number of invaders hit.
    -add starting score variable to game constructor
    -create array with invaders that have collided
    -add number of invaders collided to score
    -draw score in game draw method
* Put a limit on the number of bullets allowed on the screen at once.
* Put a limit on the number of bullets the player can fire at once.
* Fix the sound played when firing to play when you release the key, not while it is down.
* Start the game paused, and press any key to begin.
* Show a game over screen when the player is hit, and press any key to restart.
* Every X ticks -- the number of ticks are up to you -- push all invaders down one row and add a new row to the top of the board. Alternately, use `setTimeout` to make this happen every X milliseconds.

## Parcel

Use Parcel to build the game. When you have this working, put each class in its own file under the `src/` directory.
