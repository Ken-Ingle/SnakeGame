const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const gridDiv = document.getElementById('grid');

const width = 20;
const MOVE_RIGHT = 1;
const MOVE_LEFT = -1;
const MOVE_UP = -width;
const MOVE_DOWN = width;

let gridSquares = [];
let snake = [];
let currentDirection;
let intervalTime = 500;
let tickInterval;

for (let i = 0; i < width * width; i++) {
  const newDiv = document.createElement('div');
  gridDiv.appendChild(newDiv);
  gridSquares.push(newDiv);
  newDiv.innerText = i;
}

function endGame(message) {
  messageDisplay.innerText = message;
  clearInterval(tickInterval);
}

function moveSnake() {
  const tailIndex = snake.pop();
  gridSquares[tailIndex].classList.remove('snake');
  const newHeadIndex = snake[0] + currentDirection
  snake.unshift(newHeadIndex);  
  gridSquares[newHeadIndex].classList.add('snake');
}

function onGameTick() {
  // hit bottom wall
  if (snake[0] + currentDirection >= (width*width) && currentDirection == MOVE_DOWN) {
    endGame("You hit the bottom of the screen");
    return;
  }

  // hit top wall 
  if (snake[0] + currentDirection < 0 && currentDirection == MOVE_UP) {
    endGame("You hit the top of the screen");
    return;
  }

  if (snake[0] % width === 0 && currentDirection === MOVE_LEFT) {
    endGame("You hit the left of the screen");
    return;
  }

  if (snake[0] % width === width - 1 && currentDirection === MOVE_RIGHT) {
    endGame("You hit the right of the screen");
    return;
  }

  moveSnake();
}

function startGame() {
  snake = [66, 65, 64, 63, 62, 61, 60];
  currentDirection = MOVE_RIGHT;
  snake.forEach(index => {
    gridSquares[index].classList.add('snake');
  })
  tickInterval = setInterval(onGameTick, intervalTime);
}

function onKeyClick(ev) {
  if (ev.code === 'ArrowUp') {
    currentDirection = MOVE_UP;
  } else if (ev.code === 'ArrowDown') {
    currentDirection = MOVE_DOWN;
  } else if (ev.code === 'ArrowLeft') {
    currentDirection = MOVE_LEFT;
  } else if (ev.code === 'ArrowRight') {
    currentDirection = MOVE_RIGHT;
  }
}

startButton.addEventListener('click', startGame);
document.addEventListener('keyup', onKeyClick);