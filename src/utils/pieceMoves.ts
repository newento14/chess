import {Colors, ICell, Pieces} from "../types/cell";
import {AnyAction, Dispatch} from "redux";
import {ActionTypes} from "../types/boardReducer";

function checkDiagonal(board: ICell[][], row: number, col: number) {
    const directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    for (const [rowDir, colDir] of directions) {
        let i = row + rowDir;
        let j = col + colDir;

        while (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            board[i][j].canMove = true;

            if((board[i][j].piece.piece !== undefined)) {
                if (board[i][j].piece.color === board[row][col].piece.color) {
                    board[i][j].canMove = false;
                }
                break;
            }
            i += rowDir;
            j += colDir;
        }
    }
}

function checkHorizontalAndVertical(board: ICell[][], row: number, col: number) {
    // Перевірка горизонталей (ліворуч)
    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col].piece.piece === undefined) {
            board[i][col].canMove = true;
        } else {
            if (board[i][col].piece.color !== board[row][col].piece.color) {
                board[i][col].canMove = true;
            }
            break;
        }
    }

    // Перевірка горизонталей (праворуч)
    for (let i = row + 1; i <= 7; i++) {
        if (board[i][col].piece.piece === undefined) {
            board[i][col].canMove = true;
        } else {
            if (board[i][col].piece.color !== board[row][col].piece.color) {
                board[i][col].canMove = true;
            }
            break;
        }
    }

    // Перевірка вертикалей (вгору)
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i].piece.piece === undefined) {
            board[row][i].canMove = true;
        } else {
            if (board[row][i].piece.color !== board[row][col].piece.color) {
                board[row][i].canMove = true;
            }
            break;
        }
    }

    // Перевірка вертикалей (вниз)
    for (let i = col + 1; i <= 7; i++) {
        if (board[row][i].piece.piece === undefined) {
            board[row][i].canMove = true;
        } else {
            if (board[row][i].piece.color !== board[row][col].piece.color) {
                board[row][i].canMove = true;
            }
            break;
        }
    }
}

export function clearBoard(board:ICell[][]) {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            board[i][j].canMove = false;
        }
    }
}

export function pawnMove(board: ICell[][], cell: ICell, dispatch?: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;
    const { color } = cell.piece;

    const isWhite = color === Colors.white;
    const isBlack = color === Colors.black;

    const move = (row: number) => {
        if (board[i + row][j].piece.piece === undefined) {
            board[i + row][j].canMove = true;
            if (i === (isWhite ? 6 : 1) && board[i + 2 * row][j].piece.piece === undefined) {
                board[i + 2 * row][j].canMove = true;
            }
        }
    };

    const attack = (row: number, col: number) => {
        if (i + row >= 0 && i + row <= 7 && j + col >= 0 && j + col <= 7) {
            if(dispatch !== undefined) {
                if (board[i + row][j + col].piece.piece !== undefined && board[i + row][j + col].piece.color !== color) {
                    board[i + row][j + col].canMove = true;
                }
            } else {
                if (board[i + row][j + col].piece.color !== color) {
                    board[i + row][j + col].canMove = true;
                }
            }
        }
    };

    if(dispatch !== undefined) {
        board[i][j].selected = true;

        if (isWhite) {
            move(-1);
            attack(-1, -1);
            attack(-1, 1);
        }

        if (isBlack) {
            move(1);
            attack(1, -1);
            attack(1, 1);
        }
    } else {
        if (isWhite) {
            attack(-1, -1);
            attack(-1, 1);
        }

        if (isBlack) {
            attack(1, -1);
            attack(1, 1);
        }
    }

    if(dispatch !== undefined)
        dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}

export function knightMove(board: ICell[][], cell: ICell, dispatch?: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;

    if(dispatch !== undefined)
        board[i][j].selected = true;

    const knightMoves = [
        { row: -2, col: -1 },
        { row: -2, col: 1 },
        { row: -1, col: -2 },
        { row: -1, col: 2 },
        { row: 1, col: -2 },
        { row: 1, col: 2 },
        { row: 2, col: -1 },
        { row: 2, col: 1 },
    ];

    for (const move of knightMoves) {
        const newRow = i + move.row;
        const newCol = j + move.col;

        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && board[newRow][newCol].piece.color !== cell.piece.color) {
            board[newRow][newCol].canMove = true;
        }
    }

    if(dispatch !== undefined)
        dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}

export function bishopMove(board: ICell[][], cell: ICell, dispatch?: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;

    if(dispatch !== undefined)
        board[i][j].selected = true;

    checkDiagonal(board, i, j);

    if(dispatch !== undefined)
        dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}

export function rookMove(board: ICell[][], cell: ICell, dispatch?: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;

    if(dispatch !== undefined)
        board[i][j].selected = true;

    checkHorizontalAndVertical(board, i, j);

    if(dispatch !== undefined)
        dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}

export function queenMove(board: ICell[][], cell: ICell, dispatch?: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;

    if(dispatch !== undefined)
        board[i][j].selected = true;

    checkDiagonal(board, i, j);
    checkHorizontalAndVertical(board, i, j);

    if(dispatch !== undefined)
        dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}

function fillKingMoves(board: ICell[][], cell: ICell) {
    const start = Date.now();

    const color = cell.piece.color;

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            board[i][j].blackKingCanMove = true;
            board[i][j].whiteKingCanMove = true;
        }
    }

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const targetCell = board[i][j];

            if (targetCell.piece.color !== color && targetCell.piece.piece !== undefined) {
                if (targetCell.piece.piece === Pieces.pawn) {
                    pawnMove(board, targetCell);
                } else if (targetCell.piece.piece === Pieces.knight) {
                    knightMove(board, targetCell);
                } else if (targetCell.piece.piece === Pieces.bishop) {
                    bishopMove(board, targetCell);
                } else if (targetCell.piece.piece === Pieces.rook) {
                    rookMove(board, targetCell);
                } else if (targetCell.piece.piece === Pieces.queen) {
                    queenMove(board, targetCell);
                }


                for (let row = 0; row < 8; ++row) {
                    for (let col = 0; col < 8; ++col) {
                        if (board[row][col].canMove) {
                            if (color === Colors.white) {
                                board[row][col].whiteKingCanMove = false;
                            } else {
                                board[row][col].blackKingCanMove = false;
                            }
                            board[row][col].canMove = false;
                        }
                    }
                }

            }
        }
    }
    const end = Date.now();
    console.log(end - start);
}

export function kingMove(board: ICell[][], cell: ICell, dispatch: Dispatch<AnyAction>) {
    const i = cell.position.i;
    const j = cell.position.j;

    board[i][j].selected = true;
    fillKingMoves(board, cell);

    const color = cell.piece.color;

    // Check if the king can move one square in any direction
    for (let k = -1; k <= 1; ++k) {
        for (let l = -1; l <= 1; ++l) {
            if (i + k >= 0 && i + k <= 7 && j + l >= 0 && j + l <= 7) {
                const targetCell = board[i + k][j + l];

                if (targetCell.piece.piece === undefined || targetCell.piece.color !== color) {
                    if (color === Colors.white && targetCell.whiteKingCanMove)
                        targetCell.canMove = true;
                    if (color === Colors.black && targetCell.blackKingCanMove)
                        targetCell.canMove = true;
                }
            }
        }
    }

    dispatch({ type: ActionTypes.SET_BOARD, payload: board });
}