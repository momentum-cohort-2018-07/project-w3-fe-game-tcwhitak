import Keyboarder from './Keyboarder'
import Bullet from './Bullet'

// Player
// ------

// **new Player()** creates a player.
class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.color = 'green'

    // Create a keyboard object to track button presses.
    this.keyboarder = new Keyboarder()
  }

  // **update()** updates the state of the player for a single tick.
  update () {
    // If left cursor key is down...
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      // ... move left.
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    }

    // If S key is down...
    if (this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
      // ... create a bullet just above the player that will move upwards...
      const bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.y - 10 },
        { x: 0, y: -7 })

      // ... add the bullet to the game...
      this.game.addBody(bullet)

      // ... rewind the shoot sound...
      this.game.shootSound.load()

      // ... and play the shoot sound.
      this.game.shootSound.play()
    }
  }
}

export default Player
