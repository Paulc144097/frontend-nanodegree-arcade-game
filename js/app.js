// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +this.speed *dt;
    if (this.x > 505){
        this.x = -80;
        //random speed
    }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y - 50;
    var bugYBottomRange = this.y + 50;

    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
        player.resetPlayerPosition();
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var pStartX = 200,
    pStartY = 400;

var Player = function() {
    // Play initial place coordinate
    this.x = pStartX;
    this.y = pStartY;
    this.wallChecker = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    };
    this.sprite = 'images/char-boy.png';
}

// Player class instance methods ✓ (EMPTY)
Player.prototype.update = function() {

}

// Draw the player on the screen, required method for game ✓
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPlayerPosition = function() {
    this.x = pStartX;
    this.y = pStartY;
    this.resetCheckPosition();
}

Player.prototype.handleInput = function(keyPressed){
    // Key press listener, 'left', 'up', 'right', 'down' ✓
    var stepHorizontalLength = 100;
    var stepVerticalLength = 90;
    this.checkPosition();

    if (keyPressed === 'left') {
        if (this.wallChecker.leftWall) {
            return null;
        }
        this.x = this.x - stepHorizontalLength;
    } else if (keyPressed === 'right') {
        if (this.wallChecker.rightWall) {
            return null;
        }
        this.x = this.x + stepHorizontalLength;
    } else if (keyPressed === 'up') {
        if (this.y === 40) {
            this.resetPlayerPosition();
            return null;
        }
        this.y = this.y - stepVerticalLength;
    } else if (keyPressed === 'down') {
        if (this.wallChecker.bottomWall) {
            return null;
        }
        this.y = this.y + stepVerticalLength;
    } else {
        console.log('unknown key');
        return null;
    }
}


Player.prototype.checkPosition = function() {
    if (this.x === 0) {
        this.setHorizontalWallCheckerState(true, false);
    } else if (this.x === 400) {
        this.setHorizontalWallCheckerState(false, true);
    } else {
        this.setHorizontalWallCheckerState(false, false);
    }
    if (this.y === 400) {
        this.wallChecker.bottomWall = true;
    } else {
        this.wallChecker.bottomWall = false;
    }
}

Player.prototype.resetCheckPosition = function() {
    this.setHorizontalWallCheckerState(false, false);
    this.wallChecker.bottomWall = true;
}

Player.prototype.setHorizontalWallCheckerState = function(leftWallState, rightWallState) {
    this.wallChecker.leftWall = leftWallState;
    this.wallChecker.rightWall = rightWallState;
}





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    var tSpeed = Math.floor(Math.random() * 4 + 1) * 60;
    allEnemies.push(new Enemy(-100, 55 + 85 * i, tSpeed));
}

var player = new Player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//helper function?
var LogPlayerPosition = function() {
    console.log('>>> PLAYER - X: ' + player.x + ' Y: ' + player.y + ' ' + player.wallChecker.leftWall + " " + player.wallChecker.rightWall);
}
