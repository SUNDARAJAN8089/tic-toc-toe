const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const endGameDiv = document.getElementById('endGame');
const endGameText = document.getElementById('endGameText');
const newGameButton = document.getElementById('newGameButton');
let xTurn;

startGame();

function startGame() {
  xTurn = true;
  endGameDiv.style.display = 'none';
  cells.forEach(cell => {
    cell.innerText = ''; // Clear the text content
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  statusDisplay.innerText = "Player X's turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw, winnerClass) {
  if (draw) {
    endGameText.innerText = 'Draw!';
  } else {
    endGameText.innerText = `${winnerClass === X_CLASS ? "Player X" : "Player O"} wins!`;
  }
  endGameDiv.style.display = 'block';
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.innerText === 'X' || cell.innerText === 'O';
  });
}

function placeMark(cell, currentClass) {
  cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
  xTurn = !xTurn;
  statusDisplay.innerText = `${xTurn ? "Player X" : "Player O"}'s turn`;
}

function setBoardHoverClass() {
  document.body.classList.remove(X_CLASS);
  document.body.classList.remove(O_CLASS);
  if (xTurn) {
    document.body.classList.add(X_CLASS);
  } else {
    document.body.classList.add(O_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].innerText === currentClass.toUpperCase();
    });
  });
}

newGameButton.addEventListener('click', startGame);
