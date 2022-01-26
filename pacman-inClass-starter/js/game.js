"use strict";
const WALL = "🧱";
const FOOD = ".";
const EMPTY = " ";
const POWER_FOOD = `<img src="images/pizza.gif" >`;
const CHERRY = `<img src="images/cherry.gif" >`;

var gBoard;
var gFoodCount;
var gCherryInterval;
var gCollectedFoodCount;
var gGame = {
  score: 0,
  isOn: false,
};

// global elements
var elModalOver = document.querySelector(".game-over-msg");
var elBoard = document.querySelector(".board-container");
var elScore = document.querySelector("h2 span");
var elModalVictory = document.querySelector(".game-won-msg");

function init() {
  PACMAN = `<img src="images/pacman.gif" class="pacman-img" >`;
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  gFoodCount = countFood() + 1;
  gCollectedFoodCount = 0;
  printMat(gBoard, ".board-container");
  elModalOver.classList.add("hidden");
  elBoard.classList.remove("hidden");
  elModalVictory.classList.add("hidden");
  gGame.isOn = true;
  gGame.score = 0;
  elScore.innerText = 0;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      var cell = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        cell = WALL;
      } else gFoodCount++;
      board[i][j] = cell;
    }
  }
  gFoodCount--;
  board[8][8] = board[8][1] = board[1][1] = board[1][8] = POWER_FOOD;
  gFoodCount -= 4;

  return board;
}

function updateScore(diff) {
  // model
  gGame.score += diff;
  //dom

  elScore.innerText = gGame.score;
}

// TODO
function gameOver() {
  gameStops();
  elModalOver.classList.remove("hidden");
  //   elBoard.classList.add("hidden");
}

function gameWon() {
  gameStops();
  elModalVictory.classList.remove("hidden");
}

gCherryInterval = setInterval(addCherry, 10000);

function gameStops() {
  gGame.isOn = false;
  clearInterval(gCherryInterval);
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gCherryInterval = null;
}
