const board = document.getElementById("board");
let currentPlayer = "black";
let selectedPiece = null;

function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;
            board.appendChild(square);

            if ((row + col) % 2 === 0 && row < 3) {
                const piece = document.createElement("div");
                piece.classList.add("piece", "black-piece");
                square.appendChild(piece);
            } else if ((row + col) % 2 === 0 && row > 4) {
                const piece = document.createElement("div");
                piece.classList.add("piece", "red-piece");
                square.appendChild(piece);
            }
        }
    }

    // Agregar el evento de clic para las piezas
    const pieces = document.querySelectorAll(".piece");
    pieces.forEach(piece => {
        piece.addEventListener("click", handlePieceClick);
    });
}

function handlePieceClick(event) {
    const piece = event.target;
    if (piece.classList.contains(currentPlayer)) {
        if (selectedPiece) {
            selectedPiece.classList.remove("selected");
        }
        selectedPiece = piece;
        piece.classList.add("selected");
        findValidMoves(piece);
    }
}

function findValidMoves(piece) {
    const row = parseInt(piece.parentElement.dataset.row);
    const col = parseInt(piece.parentElement.dataset.col);

    // Limpiar movimientos anteriores
    clearValidMoves();

    // Verificar movimientos válidos
    checkValidMove(row - 1, col - 1);
    checkValidMove(row - 1, col + 1);
    checkValidMove(row + 1, col - 1);
    checkValidMove(row + 1, col + 1);
}

function clearValidMoves() {
    const validSquares = document.querySelectorAll(".valid");
    validSquares.forEach(square => square.classList.remove("valid"));
}

function checkValidMove(row, col) {
    const square = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (square && !square.querySelector(".piece")) {
        square.classList.add("valid");
    }
}

function movePiece(square) {
    const piece = selectedPiece;
    square.appendChild(piece);
    piece.classList.remove("selected");

    // Cambiar de jugador
    currentPlayer = currentPlayer === "black" ? "red" : "black";
    selectedPiece = null;

    // Limpiar movimientos válidos
    clearValidMoves();
}

board.addEventListener("click", event => {
    if (event.target.classList.contains("valid")) {
        movePiece(event.target);
    }
});

createBoard();
