"use strict";
// const GHOST = "👻";
const GHOST = "&#9781;";
var gGhosts = [];
var gDeadGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    color: getRandomColor(),
  };

  gGhosts.push(ghost);
  //model
  board[ghost.location.i][ghost.location.j] = GHOST;
}

// 3 ghosts and an interval
function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}

function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === GHOST) return;
  if (nextCellContent === POWER_FOOD) return;
  if (nextCellContent === PACMAN) {
    checkGhost(ghost);
  }

  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // Move the ghost
  ghost.location = nextLocation;
  ghost.currCellContent = nextCellContent;
  // update the model
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  var color = gPacman.isSuper ? "blue" : ghost.color;
  return `<span style="color:${color}">${GHOST}</span>`;
}

function changeGhostColor(ghosts) {
  for (var i = 0; i < ghosts.length; i++) {
    // model
    // ghosts[i].color = getRandomColor();
    // dom
    renderCell(ghosts[i].location, getGhostHTML(ghosts[i]));
  }
}

function checkGhost(ghost) {
  if (!gPacman.isSuper) gameOver();
  else {
    removeGhost(ghost);
  }
}

function removeGhost(ghost) {
  // remove in the model
  gGhosts.splice(gGhosts.indexOf(ghost), 1);
  gDeadGhosts.push(ghost);
  renderCell(ghost.location, FOOD);
}

function reviveGhosts() {
  for (var i = 0; i < gDeadGhosts.length; i++) {
    gGhosts.push(gDeadGhosts[i]);
  }
  gDeadGhosts = [];
}
