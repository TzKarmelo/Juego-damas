const board = document.getElementById("board");
const squares = [];
let currentPlayer = "black";
let selectedPiece = null;

function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;
            square.dataset.piece = null;
            board.appendChild(square);
            squares.push(square);

            if ((row + col) % 2 === 0 && row < 3) {
                const piece = document.createElement("div");
                piece.classList.add("piece", "black-piece");
                square.appendChild(piece);
                square.dataset.piece = "black";
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.addEventListener("click", handlePieceClick);
            } else if ((row + col) % 2 === 0 && row > 4) {
                const piece = document.createElement("div");
                piece.classList.add("piece", "red-piece");
                square.appendChild(piece);
                square.dataset.piece = "red";
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.addEventListener("click", handlePieceClick);
            }
        }
    }
}

function handlePieceClick(event) {
    const piece = event.target;
    const row = parseInt(piece.dataset.row);
    const col = parseInt(piece.dataset.col);

    if (piece.classList.contains(currentPlayer)) {
        if (selectedPiece) {
            selectedPiece.classList.remove("selected");
        }
        selectedPiece = piece;
        piece.classList.add("selected");
        findValidMoves(row, col);
    }
}

function findValidMoves(row, col) {
    clearValidMoves();
    checkValidMove(row, col, row - 1, col - 1);
    checkValidMove(row, col, row - 1, col + 1);
    checkValidMove(row, col, row + 1, col - 1);
    checkValidMove(row, col, row + 1, col + 1);

    if (selectedPiece.classList.contains("king")) {
        checkValidMove(row, col, row - 1, col + 1);
        checkValidMove(row, col, row - 1, col - 1);
        checkValidMove(row, col, row + 1, col + 1);
        checkValidMove(row, col, row + 1, col - 1);
    }
}

function checkValidMove(fromRow, fromCol, toRow, toCol) {
    const square = getSquare(toRow, toCol);
    if (isValidSquare(toRow, toCol) && !square.dataset.piece) {
        square.classList.add("valid");
    }
}

function clearValidMoves() {
    const validSquares = document.querySelectorAll(".valid");
    validSquares.forEach(square => square.classList.remove("valid"));
}

function movePiece(square) {
    if (square.classList.contains("valid")) {
        square.appendChild(selectedPiece);
        selectedPiece.classList.remove("selected");
        const fromRow = parseInt(selectedPiece.dataset.row);
        const fromCol = parseInt(selectedPiece.dataset.col);
        const toRow = parseInt(square.dataset.row);
        const toCol = parseInt(square.dataset.col);
        squares[toRow * 8 + toCol].dataset.piece = currentPlayer;
        squares[fromRow * 8 + fromCol].dataset.piece = null;

        if (toRow === 0 || toRow === 7) {
            selectedPiece.classList.add("king");
        }
        currentPlayer = currentPlayer === "black" ? "red" : "black";
        selectedPiece = null;
        clearValidMoves();
    }
}

function getSquare(row, col) {
    return squares[row * 8 + col];
}

function isValidSquare(row, col) {
    return row >= 0 && col >= 0 && row < 8 && col < 8;
}

board.addEventListener("click", event => {
    if (selectedPiece) {
        movePiece(event.target);
    }
});

createBoard();
