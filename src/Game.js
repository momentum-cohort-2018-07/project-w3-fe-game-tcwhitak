import {createInvaders, colliding, drawRect} from './Constants'
import Player from './Player'
import Invader from './Invaders'
// Main game object
// ----------------

// **new Game()** Creates the game object with the game state and logic.
class Game {
  constructor () {
    // In index.html, there is a canvas tag that the game will be drawn in.
    // Grab that canvas out of the DOM.
    const canvas = document.getElementById('space-invaders')

    // Get the drawing context.  This contains functions that const you draw to the canvas.
    const screen = canvas.getContext('2d')

    // Note down the dimensions of the canvas.  These are used to
    // place game bodies.
    const gameSize = { x: canvas.width, y: canvas.height }

    // initial score for game
    this.score = 0

    // Create the bodies array to hold the player, invaders and bullets.
    this.bodies = []

    // Add the invaders to the bodies array.
    this.bodies = this.bodies.concat(createInvaders(this))

    // Add the player to the bodies array.
    this.bodies = this.bodies.concat(new Player(this, gameSize))

    // In index.html, there is an audio tag that loads the shooting sound.
    // Get the shoot sound from the DOM and store it on the game object.
    this.shootSound = document.getElementById('shoot-sound')

    // Main game tick function.  Loops forever, running 60ish times a second.
    const tick = () => {
      // Update game state.
      this.update()

      // Draw game bodies.
      this.draw(screen, gameSize)

      // Queue up the next call to tick with the browser.
      window.requestAnimationFrame(tick)
    }

    // Run the first game tick.  All future calls will be scheduled by
    // the tick() function itself.
    this.tick = tick
  }

  start () {
    this.tick()
  }

  // **update()** runs the main game logic.
  update () {
    // `notCollidingWithAnything` returns true if passed body
    // is not colliding with anything.
    const notCollidingWithAnything = (b1) => {
      return this.bodies.filter((b2) => { return colliding(b1, b2) }).length === 0
    }

    // Throw away bodies that are colliding with something. They
    // will never be updated or draw again.
    this.bodies = this.bodies.filter(notCollidingWithAnything)

    // Call update on every body.
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  // **draw()** draws the game.
  draw (screen, gameSize) {
    // Clear away the drawing from the previous tick.
    screen.clearRect(0, 0, gameSize.x, gameSize.y)

    // Draw each body as a rectangle.
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  // **invadersBelow()** returns true if `invader` is directly
  // above at least one other invader.
  invadersBelow (invader) {
    // If filtered array is not empty, there are invaders below.
    return this.bodies.filter(function (b) {
      // Keep `b` if it is an invader, if it is in the same column
      // as `invader`, and if it is somewhere below `invader`.
      return b instanceof Invader &&
            Math.abs(invader.center.x - b.center.x) < b.size.x &&
            b.center.y > invader.center.y
    }).length > 0
  }

  // **addBody()** adds a body to the bodies array.
  addBody (body) {
    this.bodies.push(body)
  }
}

export default Game
