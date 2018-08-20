let canvas;
let canvasContext;
// initial ball position
let ballX = 400;
let ballY = 300;
//ball speed
let ballSpeedX = 10;
let ballSpeedY = 4;
//paddle start position
let paddle1Y = 250;
let paddle2Y = 250;
//initial score values
let player1Score = 0;
let player2Score = 0;
//paddles dimensions
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

//winning score
const WINNING_SCORE = 20;

// win screen
let showingWinScreen = false

//function to allow paddle to track mouse location
function calculateMousePos (evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
};

function handleMouseClick(evt){
 if (showingWinScreen = true){
     player1Score = 0;
     player2Score = 0;
     showingWinScreen = false;
 }
}

window.onload = function(){
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function(){
        moveAll();
        drawAll();
    }, 1000/framesPerSecond);
    
    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
function(evt){
    let mousePos = calculateMousePos(evt)
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
})
};

function ballReset (){
if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE){
    showingWinScreen = true;
}

    ballSpeedX = -ballSpeedX
    ballSpeedY = 4;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement(){
    let centerPaddle2Y = paddle2Y + (PADDLE_HEIGHT/2)
    if(centerPaddle2Y < ballY - 35){
        paddle2Y += 6;
    } else if(centerPaddle2Y > ballY + 35) {
        paddle2Y -= 6;
    }
}

function moveAll(){
   computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //if ball goes off left side...
    if(ballX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            let deltaY = ballY - (paddle1Y+(PADDLE_HEIGHT/2))
            ballSpeedY = deltaY*0.35
        } else {
            player2Score += 10;
            ballReset()
        }
    }
    //if ball goes off right side
    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            let deltaY = ballY - (paddle2Y+(PADDLE_HEIGHT/2))
            ballSpeedY = deltaY*0.35
        }else{
            player1Score += 10;
            ballReset();
        }
    }
//if ball hits top or bottom
    if(ballY > canvas.height || ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet (){
    for (let i = 0; i<canvas.height; i+=40){
        colorRect(canvas.width/2 -1, i, 2, 20, 'white');
    }

}

function drawAll(){
    if (showingWinScreen){

        if (player1Score === WINNING_SCORE){
            canvasContext.fillText("Player 1 Wins!", 300, 300)
        }
        else if(player2Score === WINNING_SCORE){
            canvasContext.fillText("Player 2 Wins!", 450, 300)
        }


        canvasContext.fillText("Game over, click to continue", 350, 500)
        return
    }
    //draws black screen
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // draws net
    drawNet();
    //draws paddle 1 player
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    //draws paddle 2 computer
    colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    //draws ball
    colorCircle(ballX, ballY, 10, 'white');
    //draw scores
    canvasContext.fillText(player1Score, 100, 100)
    canvasContext.fillText(player2Score, canvas.width - 100, 100)
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}