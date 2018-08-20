// Keyboard input tracking
// -----------------------

// **new Keyboarder()** creates a new keyboard input tracking object.
class Keyboarder {
  constructor () {
    // Records up/down state of each key that has ever been pressed.
    const keyState = {}

    // When key goes down, record that it is down.
    window.addEventListener('keydown', function (e) {
      keyState[e.keyCode] = true
      console.log('key down', e.keyCode)
    })

    // When key goes up, record that it is up.
    window.addEventListener('keyup', function (e) {
      keyState[e.keyCode] = false
      console.log('key up', e.keyCode)
    })

    // Returns true if passed key is currently down.  `keyCode` is a
    // unique number that represents a particular key on the keyboard.
    this.isDown = function (keyCode) {
      return keyState[keyCode] === true
    }

    // Handy constants that give keyCodes human-readable names.
    this.KEYS = { LEFT: 37, RIGHT: 39, S: 83 }
  }
}

export default Keyboarder
