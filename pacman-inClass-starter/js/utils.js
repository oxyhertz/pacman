function printMat(mat, selector) {
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
