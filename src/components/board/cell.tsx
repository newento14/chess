import React, {FC} from 'react';
import {Colors, ICell, Pieces} from "../../types/cell";
import blackBishop from '../../assets/blackBishop.png';
import blackKing from '../../assets/blackKing.png';
import blackKnight from '../../assets/blackKnight.png';
import blackPawn from '../../assets/blackPawn.png';
import blackQueen from '../../assets/blackQueen.png';
import blackRook from '../../assets/blackRook.png';
import whiteBishop from '../../assets/whiteBishop.png';
import whiteKing from '../../assets/whiteKing.png';
import whiteKnight from '../../assets/whiteKnight.png';
import whitePawn from '../../assets/whitePawn.png';
import whiteQueen from '../../assets/whiteQueen.png';
import whiteRook from '../../assets/whiteRook.png';
import {useDispatch} from "react-redux";
import {ActionTypes} from "../../types/boardReducer";
import {bishopMove, clearBoard, kingMove, knightMove, pawnMove, queenMove, rookMove} from "../../utils/pieceMoves";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface CellProps {
    cell: ICell,
}

const Cell: FC<CellProps> = ({cell}) => {
    const dispatch = useDispatch();
    const board = useTypedSelector(x => x.board.board);
    const selectedCell = useTypedSelector(x => x.board.selectedCell);
    const selectedPiece = useTypedSelector(x => x.board.selectedCell?.piece);

    let pieceImage = null;
    const piece = cell.piece;

    if (piece.color === Colors.black) {
        switch (piece.piece) {
            case Pieces.bishop:
                pieceImage = blackBishop;
                break;
            case Pieces.king:
                pieceImage = blackKing;
                break;
            case Pieces.knight:
                pieceImage = blackKnight;
                break;
            case Pieces.pawn:
                pieceImage = blackPawn;
                break;
            case Pieces.queen:
                pieceImage = blackQueen;
                break;
            case Pieces.rook:
                pieceImage = blackRook;
                break;
        }
    } else if (piece.color === Colors.white) {
        switch (piece.piece) {
            case Pieces.bishop:
                pieceImage = whiteBishop;
                break;
            case Pieces.king:
                pieceImage = whiteKing;
                break;
            case Pieces.knight:
                pieceImage = whiteKnight;
                break;
            case Pieces.pawn:
                pieceImage = whitePawn;
                break;
            case Pieces.queen:
                pieceImage = whiteQueen;
                break;
            case Pieces.rook:
                pieceImage = whiteRook;
                break;
        }
    }

    function handleCellClick() {
        if (cell.piece.piece === undefined && !cell.canMove) {
            return;
        }

        if (cell.canMove) {
            if (selectedCell !== null && selectedPiece !== undefined ) {
                board[selectedCell.position.i][selectedCell.position.j].piece = {};
                board[cell.position.i][cell.position.j].piece = selectedPiece;

                board[selectedCell.position.i][selectedCell.position.j].selected = false;
                clearBoard(board);

                dispatch({type: ActionTypes.SET_BOARD, payload: board});
            }

        } else {
            if (selectedCell !== null) {
                board[selectedCell.position.i][selectedCell.position.j].selected = false;
                clearBoard(board);
            }

            dispatch({type: ActionTypes.SET_PIECE, payload: cell});

            switch (cell.piece.piece) {
                case Pieces.pawn: {
                    pawnMove(board, cell, dispatch);
                    break;
                }
                case Pieces.knight: {
                    knightMove(board, cell, dispatch);
                    break;
                }
                case Pieces.bishop: {
                    bishopMove(board, cell, dispatch);
                    break;
                }
                case Pieces.rook: {
                    rookMove(board, cell, dispatch);
                    break;
                }
                case Pieces.queen: {
                    queenMove(board, cell, dispatch);
                    break;
                }
                case Pieces.king: {
                    kingMove(board, cell, dispatch);
                    break;
                }
            }
        }

    }

    const classes = ['cell'];

    if (cell.selected) {
        classes.push('selected');
    } else {
        classes.push(cell.color);
    }


    return (
        <div className={classes.join(" ")} onClick={handleCellClick}>
            {pieceImage !== null && cell.canMove
                ? (
                    <>
                        <img src={pieceImage} alt="chessPiece"/>
                        <div className='circle' ></div>
                    </>
                )
                : pieceImage !== null
                    ? <img src={pieceImage} alt="chessPiece" />
                    : cell.canMove && <div className="dot"></div>
            }

        </div>
    );
};

export default Cell;