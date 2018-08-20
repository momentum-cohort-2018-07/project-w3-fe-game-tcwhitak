// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"script.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main game object
// ----------------

// **new Game()** Creates the game object with the game state and logic.
var Game = function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    // In index.html, there is a canvas tag that the game will be drawn in.
    // Grab that canvas out of the DOM.
    var canvas = document.getElementById('space-invaders');

    // Get the drawing context.  This contains functions that const you draw to the canvas.
    var screen = canvas.getContext('2d');

    // Note down the dimensions of the canvas.  These are used to
    // place game bodies.
    var gameSize = { x: canvas.width, y: canvas.height

      //initial score for game
    };this.score = 0;

    // Create the bodies array to hold the player, invaders and bullets.
    this.bodies = [];

    // Add the invaders to the bodies array.
    this.bodies = this.bodies.concat(createInvaders(this));

    // Add the player to the bodies array.
    this.bodies = this.bodies.concat(new Player(this, gameSize));

    // In index.html, there is an audio tag that loads the shooting sound.
    // Get the shoot sound from the DOM and store it on the game object.
    this.shootSound = document.getElementById('shoot-sound');

    // Main game tick function.  Loops forever, running 60ish times a second.
    var tick = function tick() {
      // Update game state.
      _this.update();

      // Draw game bodies.
      _this.draw(screen, gameSize);

      // Queue up the next call to tick with the browser.
      window.requestAnimationFrame(tick);
    };

    // Run the first game tick.  All future calls will be scheduled by
    // the tick() function itself.
    this.tick = tick;
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      this.tick();
    }

    // **update()** runs the main game logic.

  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      // `notCollidingWithAnything` returns true if passed body
      // is not colliding with anything.
      var notCollidingWithAnything = function notCollidingWithAnything(b1) {
        return _this2.bodies.filter(function (b2) {
          return colliding(b1, b2);
        }).length === 0;
      };

      // Throw away bodies that are colliding with something. They
      // will never be updated or draw again.
      this.bodies = this.bodies.filter(notCollidingWithAnything);

      // Call update on every body.
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }
    }

    // **draw()** draws the game.

  }, {
    key: 'draw',
    value: function draw(screen, gameSize) {
      // Clear away the drawing from the previous tick.
      screen.clearRect(0, 0, gameSize.x, gameSize.y);

      // Draw each body as a rectangle.
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(screen, this.bodies[i]);
      }
    }

    // **invadersBelow()** returns true if `invader` is directly
    // above at least one other invader.

  }, {
    key: 'invadersBelow',
    value: function invadersBelow(invader) {
      // If filtered array is not empty, there are invaders below.
      return this.bodies.filter(function (b) {
        // Keep `b` if it is an invader, if it is in the same column
        // as `invader`, and if it is somewhere below `invader`.
        return b instanceof Invader && Math.abs(invader.center.x - b.center.x) < b.size.x && b.center.y > invader.center.y;
      }).length > 0;
    }

    // **addBody()** adds a body to the bodies array.

  }, {
    key: 'addBody',
    value: function addBody(body) {
      this.bodies.push(body);
    }
  }]);

  return Game;
}();

// Invaders
// --------

// **new Invader()** creates an invader.


var Invader = function () {
  function Invader(game, center) {
    _classCallCheck(this, Invader);

    this.game = game;
    this.center = center;
    this.size = { x: 15, y: 15 };
    this.color = 'purple';

    // Invaders patrol from left to right and back again.
    // `this.patrolX` records the current (relative) position of the
    // invader in their patrol.  It starts at 0, increases to 40, then
    // decreases to 0, and so forth.
    this.patrolX = 0;

    // The x speed of the invader.  A positive value moves the invader
    // right. A negative value moves it left.
    this.speedX = 0.3;
  }

  // **update()** updates the state of the invader for a single tick.


  _createClass(Invader, [{
    key: 'update',
    value: function update() {
      // If the invader is outside the bounds of their patrol...
      if (this.patrolX < 0 || this.patrolX > 30) {
        // ... reverse direction of movement.
        this.speedX = -this.speedX;
      }

      // If coin flip comes up and no friends below in this
      // invader's column...
      if (Math.random() > 0.995 && !this.game.invadersBelow(this)) {
        // ... create a bullet just below the invader that will move
        // downward...
        var bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.y / 2 }, { x: Math.random() - 0.5, y: 2 });

        // ... and add the bullet to the game.
        this.game.addBody(bullet);
      }

      // Move according to current x speed.
      this.center.x += this.speedX;

      // Update variable that keeps track of current position in patrol.
      this.patrolX += this.speedX;
    }
  }]);

  return Invader;
}();

// **createInvaders()** returns an array of twenty-four invaders.


var createInvaders = function createInvaders(game) {
  var invaders = [];
  for (var i = 0; i < 24; i++) {
    // Place invaders in eight columns.
    var x = 30 + i % 8 * 30;

    // Place invaders in three rows.
    var y = 30 + i % 3 * 30;

    // Create invader.
    invaders.push(new Invader(game, { x: x, y: y }));
  }

  return invaders;
};

// Player
// ------

// **new Player()** creates a player.

var Player = function () {
  function Player(game, gameSize) {
    _classCallCheck(this, Player);

    this.game = game;
    this.size = { x: 15, y: 15 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 };
    this.color = 'green';

    // Create a keyboard object to track button presses.
    this.keyboarder = new Keyboarder();
  }

  // **update()** updates the state of the player for a single tick.


  _createClass(Player, [{
    key: 'update',
    value: function update() {
      // If left cursor key is down...
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        // ... move left.
        this.center.x -= 2;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 2;
      }

      // If S key is down...
      if (this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
        // ... create a bullet just above the player that will move upwards...
        var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.y - 10 }, { x: 0, y: -7 });

        // ... add the bullet to the game...
        this.game.addBody(bullet);

        // ... rewind the shoot sound...
        this.game.shootSound.load();

        // ... and play the shoot sound.
        this.game.shootSound.play();
      }
    }
  }]);

  return Player;
}();

// Bullet
// ------

// **new Bullet()** creates a new bullet.


var Bullet = function () {
  function Bullet(center, velocity) {
    _classCallCheck(this, Bullet);

    this.center = center;
    this.size = { x: 3, y: 3 };
    this.velocity = velocity;
    this.color = 'black';
  }

  // **update()** updates the state of the bullet for a single tick.


  _createClass(Bullet, [{
    key: 'update',
    value: function update() {
      // Add velocity to center to move bullet.
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
    }
  }]);

  return Bullet;
}();

// Keyboard input tracking
// -----------------------

// **new Keyboarder()** creates a new keyboard input tracking object.


var Keyboarder = function Keyboarder() {
  _classCallCheck(this, Keyboarder);

  // Records up/down state of each key that has ever been pressed.
  var keyState = {};

  // When key goes down, record that it is down.
  window.addEventListener('keydown', function (e) {
    keyState[e.keyCode] = true;
    console.log('key down', e.keyCode);
  });

  // When key goes up, record that it is up.
  window.addEventListener('keyup', function (e) {
    keyState[e.keyCode] = false;
    console.log('key up', e.keyCode);
  });

  // Returns true if passed key is currently down.  `keyCode` is a
  // unique number that represents a particular key on the keyboard.
  this.isDown = function (keyCode) {
    return keyState[keyCode] === true;
  };

  // Handy constants that give keyCodes human-readable names.
  this.KEYS = { LEFT: 37, RIGHT: 39, S: 83 };
};

// Other functions
// ---------------

// **drawRect()** draws passed body as a rectangle to `screen`, the drawing context.


var drawRect = function drawRect(screen, body) {
  screen.fillStyle = body.color;
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y);
};

// **colliding()** returns true if two passed bodies are colliding.
// The approach is to test for five situations.  If any are true,
// the bodies are definitely not colliding.  If none of them
// are true, the bodies are colliding.
// 1. b1 is the same body as b2.
// 2. Right of `b1` is to the left of the left of `b2`.
// 3. Bottom of `b1` is above the top of `b2`.
// 4. Left of `b1` is to the right of the right of `b2`.
// 5. Top of `b1` is below the bottom of `b2`.
var colliding = function colliding(b1, b2) {
  return !(b1 === b2 || b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 || b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 || b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 || b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
};

// Start game
// ----------

// When the DOM is ready, create (and start) the game.
window.addEventListener('load', function () {
  var game = new Game();
  game.start();
});
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '61016' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.228fd0c2.map