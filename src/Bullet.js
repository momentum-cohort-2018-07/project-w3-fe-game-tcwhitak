// Bullet
// ------

// **new Bullet()** creates a new bullet.
class Bullet {
  constructor (center, velocity) {
    this.center = center
    this.size = { x: 3, y: 3 }
    this.velocity = velocity
    this.color = 'black'
  }

  // **update()** updates the state of the bullet for a single tick.
  update () {
    // Add velocity to center to move bullet.
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y
  }
}

export default Bullet
