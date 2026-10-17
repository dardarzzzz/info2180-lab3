document.addEventListener("DOMContentLoaded", function () {
  const DEFAULT_MESSAGE = "Move your mouse over a square and click to play an X or an O.";

  const squares = document.querySelectorAll("#board div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");

  
  const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  let gameState = new Array(9).fill(null); 
  let currentPlayer = "X";
  let gameOver = false;

  
  squares.forEach(function (square, index) {
    square.classList.add("square");

    
    square.addEventListener("click", function () {
      if (gameOver || gameState[index] !== null) {
        return; 
      }

      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);
      square.classList.remove("hover");

      if (checkWinner(currentPlayer)) {
        
        status.textContent = "Congratulations! " + currentPlayer + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    
    square.addEventListener("mouseover", function () {
      if (!gameOver && gameState[index] === null) {
        square.classList.add("hover");
      }
    });

    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  
  function checkWinner(player) {
    return WINNING_LINES.some(function (line) {
      return line.every(function (i) {
        return gameState[i] === player;
      });
    });
  }

  
  newGameBtn.addEventListener("click", function () {
    gameState = new Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;

    squares.forEach(function (square) {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });

    status.textContent = DEFAULT_MESSAGE;
    status.classList.remove("you-won");
  });
});
