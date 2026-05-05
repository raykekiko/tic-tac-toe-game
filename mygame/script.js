const board = document.getElementById("board");
const winnerPopup = document.getElementById("winner");
const winnerText = document.getElementById("winner-text");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell || "";
        cellElement.addEventListener("click", handleMove, { once: true });
        board.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || checkWinner()) return;
    gameBoard[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWinner()) {
        winnerText.innerText = `Player ${currentPlayer} wins!`;
        winnerPopup.style.display = "block";
        return;
    }
    if (gameBoard.every(cell => cell !== null)) {
        winnerText.innerText = "Match Draw!";
        winnerPopup.style.display = "block";
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = "X";
    winnerPopup.style.display = "none";
    createBoard();
}

createBoard();
