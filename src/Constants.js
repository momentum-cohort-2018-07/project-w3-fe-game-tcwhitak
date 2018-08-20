import Invader from './Invaders'
// **createInvaders()** returns an array of twenty-four invaders.
export const createInvaders = function (game) {
  const invaders = []
  for (let i = 0; i < 24; i++) {
    // Place invaders in eight columns.
    let x = 30 + (i % 8) * 30

    // Place invaders in three rows.
    let y = 30 + (i % 3) * 30

    // Create invader.
    invaders.push(new Invader(game, {x: x, y: y}))
  }

  return invaders
}

// Other functions
// ---------------

// **drawRect()** draws passed body as a rectangle to `screen`, the drawing context.
export const drawRect = function (screen, body) {
  screen.fillStyle = body.color
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
}

// **colliding()** returns true if two passed bodies are colliding.
// The approach is to test for five situations.  If any are true,
// the bodies are definitely not colliding.  If none of them
// are true, the bodies are colliding.
// 1. b1 is the same body as b2.
// 2. Right of `b1` is to the left of the left of `b2`.
// 3. Bottom of `b1` is above the top of `b2`.
// 4. Left of `b1` is to the right of the right of `b2`.
// 5. Top of `b1` is below the bottom of `b2`.
export const colliding = function (b1, b2) {
  return !(
    b1 === b2 ||
          b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
          b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
          b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
          b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  )
}
