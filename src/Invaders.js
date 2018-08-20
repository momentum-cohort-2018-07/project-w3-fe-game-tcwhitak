import Bullet from './Bullet'

// Invaders
// --------

// **new Invader()** creates an invader.
class Invader {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
    this.color = 'purple'

    // Invaders patrol from left to right and back again.
    // `this.patrolX` records the current (relative) position of the
    // invader in their patrol.  It starts at 0, increases to 40, then
    // decreases to 0, and so forth.
    this.patrolX = 0

    // The x speed of the invader.  A positive value moves the invader
    // right. A negative value moves it left.
    this.speedX = 0.3
  }

  // **update()** updates the state of the invader for a single tick.
  update () {
    // If the invader is outside the bounds of their patrol...
    if (this.patrolX < 0 || this.patrolX > 30) {
      // ... reverse direction of movement.
      this.speedX = -this.speedX
    }

    // If coin flip comes up and no friends below in this
    // invader's column...
    if (Math.random() > 0.995 &&
              !this.game.invadersBelow(this)) {
      // ... create a bullet just below the invader that will move
      // downward...
      const bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.y / 2 },
        { x: Math.random() - 0.5, y: 2 })

      // ... and add the bullet to the game.
      this.game.addBody(bullet)
    }

    // Move according to current x speed.
    this.center.x += this.speedX

    // Update variable that keeps track of current position in patrol.
    this.patrolX += this.speedX
  }
}

export default Invader
