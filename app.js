const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const gridDiv = document.getElementById('grid');
const sizeInput = document.getElementById('sizeInput');

let width = 20;
const MOVE_RIGHT = 1;
const MOVE_LEFT = -1;
let MOVE_UP = -width;
let MOVE_DOWN = width;

let gridSquares = [];
let snake = [];
let currentDirection;
let intervalTime = 500;
let tickInterval;

// for (let i = 0; i < width * width; i++) {
//   const newDiv = document.createElement('div');
//   gridDiv.appendChild(newDiv);
//   gridSquares.push(newDiv);
// }

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

  // got the apple
  if (gridSquares[newHeadIndex].classList.contains('apple')) {
    gridSquares[newHeadIndex].classList.remove('apple');

    // grow the snake
    gridSquares[tailIndex].classList.add('snake');
    snake.push(tailIndex);

    intervalTime -= 100;
    messageDisplay.innerText = "Time is " + intervalTime;

    placeApple();
    score++;
    clearInterval(tickInterval);
    tickInterval = setInterval(onGameTick, intervalTime);
    scoreDisplay.innerText = score;
  }
}

function placeApple() {
  let appleIndex;
  do {
    appleIndex = Math.floor(Math.random() * width*width);
  } while(gridSquares[appleIndex].classList.contains('snake'));
  
  gridSquares[appleIndex].classList.add('apple');
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

  // hit left wall
  if (snake[0] % width === 0 && currentDirection === MOVE_LEFT) {
    endGame("You hit the left of the screen");
    return;
  }

  // hit right wall
  if (snake[0] % width === width - 1 && currentDirection === MOVE_RIGHT) {
    endGame("You hit the right of the screen");
    return;
  }

  // snake hit itself
  if (gridSquares[snake[0] + currentDirection].classList.contains('snake')) {
    endGame("You hit yourself");
    return;
  }

  moveSnake();
}

function setGridSize(size) {
  while (gridDiv.firstChild) {
    gridDiv.removeChild(gridDiv.firstChild);
  }

  gridSquares = [];
  width = size;
  MOVE_UP = -1 * width;
  MOVE_DOWN = width;
  let pixelSize = 600 / size;
  for (let i = 0; i < width * width; i++) {
    const newDiv = document.createElement('div');
    newDiv.style.width = pixelSize + "px";
    newDiv.style.height = pixelSize + "px";
    gridDiv.appendChild(newDiv);
    gridSquares.push(newDiv);
  }
}

function startGame() {
  setGridSize(parseInt(sizeInput.value));
  
  snake.forEach(index => {
    gridSquares[index].classList.remove('snake');
  });
  
  gridSquares.forEach(square => square.classList.remove('apple'));
  snake = [62, 61, 60];
  currentDirection = MOVE_RIGHT;
  snake.forEach(index => {
    gridSquares[index].classList.add('snake');
  })
  placeApple();
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