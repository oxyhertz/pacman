"use strict";
function createMat(rows, cols) {
  var board = [];
  for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < cols; j++) {
      cell = board[i][j];
    }
  }
  return board;
}

function rendMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = "cell cell-" + i + "-" + j;
      if (cell === WALL) className = "cell cell-" + i + "-" + j + " wall";
      strHTML += '<td class="' + className + '"> ' + cell + " </td>";
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getGhost(location) {
  if (gBoard[location.i][location.j] !== GHOST) return;
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j)
      return gGhosts[i];
  }
  return null;
}

function removeGhostsDom(ghosts) {
  for (var i = 0; i < ghosts.length; i++) {
    renderCell(ghosts[i].location, FOOD);
  }
}

function getEmptyPos() {
  var res = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === " ")
        res.push({
          i: i,
          j: j,
        });
    }
  }
  if (res.length) return res[getRandomIntInclusive(0, res.length - 1)];
  return null;
}

function addCherry() {
  var location = getEmptyPos();
  if (!location) return;
  // model
  gBoard[location.i][location.j] = CHERRY;
  // DOM
  renderCell(location, CHERRY);
}

function countFood() {
  var counter = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === ".") counter++;
    }
  }
  return counter;
}

function countNegs(mat, rowIdx, colIdx) {
  var count = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > mat[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = mat[i][j];
      if (currCell === "*") count++;
    }
  }
  return count;
}

function getCountSecondaryDiagonal(symbol) {
  var count = 0;
  for (var i = 0; i < gBoard.length; i++) {
    var currCell = gBoard[i][gBoard.length - i - 1];
    if (currCell === symbol) count++;
  }
  return count;
}

function getCountPrimaryDiagonal(symbol) {
  var count = 0;
  for (var i = 0; i < gBoard.length; i++) {
    var currCell = gBoard[i][i];
    if (currCell === symbol) count++;
  }
  return count;
}
