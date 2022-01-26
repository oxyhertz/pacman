"use strict";
// const PACMAN = "😷";
var PACMAN = `<img src="images/pacman.gif" class="pacman-img" >`;
var gRotate;
var gSuperInterval;
var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  // return if cannot move
  if (nextCellContent === WALL) return;

  if (nextCellContent === GHOST) {
    var currGhost = getGhost(nextLocation);
    checkGhost(currGhost);
  }

  if ((nextCellContent === POWER_FOOD) & gPacman.isSuper) return;

  if (nextCellContent === POWER_FOOD) {
    gPacman.isSuper = true;
    changeGhostColor(gGhosts);
    setTimeout(() => {
      // removeGhostsDom(gGhosts);
      gPacman.isSuper = false;
      reviveGhosts();
    }, 5000);
  }

  if (nextCellContent === FOOD) collectFood();

  if (nextCellContent === CHERRY) updateScore(10);
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  // Move the pacman
  gPacman.location = nextLocation;
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  PACMAN = `<img src="images/pacman.gif" class="pacman-img" style="${gRotate}">`;
  renderCell(gPacman.location, PACMAN);
}

function collectFood() {
  updateScore(1);
  gFoodCount--;
  if (gFoodCount === 0) gameWon();
}

function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // figure out nextLocation
  switch (ev.key) {
    case "ArrowDown":
      gRotate = "transform: rotate(90deg)";
      nextLocation.i++;
      break;
    case "ArrowUp":
      gRotate = "transform: rotate(-90deg)";
      nextLocation.i--;
      break;
    case "ArrowLeft":
      gRotate = "transform: rotate(180deg)";
      nextLocation.j--;
      break;
    case "ArrowRight":
      gRotate = "transform: rotate(0deg)";
      nextLocation.j++;
      break;
  }

  return nextLocation;
}
