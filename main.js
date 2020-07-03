var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameStart = false;
var score = 0;
var x = canvas.width - 125;
var y = canvas.height - 125;
var dx = -2;
var dy = 2;
var ballR = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
   bricks[c] = [];
   for (r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {
         x: 0,
         y: 0,
         status: 1
      };
   }
}

function draw() {
   // drawing code
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawScore();
   drawBricks();
   drawBall();
   drawPaddle();
   collisionDetection();
   checkBallCol();
   x += dx;
   y += dy;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawBricks() {
   for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
         if (bricks[c][r].status == 1) {
            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
         }
      }
   }
}

function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballR, 0, Math.PI * 2);
   ctx.fillStyle = "#0095DD";
   ctx.fill();
   ctx.closePath();
}

function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "#0095DD";
   ctx.fill();
   ctx.closePath();
   checkControl();
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                       alert("YOU WIN, CONGRATULATIONS!");
                       restartGame();
                    }
                }
            }
        }
    }
}

function calcXDirection(){
   var paddleMid = paddleX + (paddleWidth/2);
   if(x < paddleX + paddleWidth && x >= paddleMid && dx < 0){
      return -dx;
   }
   else if(x > paddleX && x <= paddleMid && dx > 0){
      return -dx;
   }
   else{
      return dx;
   }
}

function checkBallCol() {
   if (y + dy < ballR) {
      dy = -dy;
   } else if (y + dy > canvas.height - ballR) {
      if (x > paddleX && x < paddleX + paddleWidth) {
         dx = calcXDirection();
         dy = -dy;
      } else {
         //alert("GAME OVER");
         restartGame();
      }
   }
   if (x + dx > canvas.width - ballR || x + dx < ballR) {
      dx = -dx;
   }
}

function checkControl() {
   if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
   } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
   }
}

document.addEventListener("mousemove", mouseMoveHandler)
setInterval(draw, 10);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
   if (e.keyCode == 39) {
      rightPressed = true;
   } else if (e.keyCode == 37) {
      leftPressed = true;
   }
}

function keyUpHandler(e) {
   if (e.keyCode == 39) {
      rightPressed = false;
   } else if (e.keyCode == 37) {
      leftPressed = false;
   }
}

function restartGame(){
score = 0;
x = canvas.width - 125;
y = canvas.height - 125;
dx = 2;
dy = -2;
ballR = 10;
paddleHeight = 10;
paddleWidth = 75;
paddleX = (canvas.width - paddleWidth) / 2;
rightPressed = false;
leftPressed = false;
brickRowCount = 3;
brickColumnCount = 5;
brickWidth = 75;
brickHeight = 20;
brickPadding = 10;
brickOffsetTop = 30;
brickOffsetLeft = 30;
bricks = [];
for (c = 0; c < brickColumnCount; c++) {
   bricks[c] = [];
   for (r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {
         x: 0,
         y: 0,
         status: 1
      };
   }
}
}