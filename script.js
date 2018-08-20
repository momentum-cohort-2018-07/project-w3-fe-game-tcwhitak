// import Game class so game can be loaded
import Game from './src/Game'

// Start game
// ----------

// When the DOM is ready, create (and start) the game.
window.addEventListener('load', function () {
  let game = new Game()
  game.start()
})
