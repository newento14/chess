import React, {FC} from 'react';
import {Colors, Piece, Pieces} from "../../types/cell";
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

interface CellProps {
    color: Colors;
    piece: Piece;
}

const Cell: FC<CellProps> = ({color, piece}) => {
    let pieceImage = null;

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


    return (
        <div className={['cell', color].join(" ")}>
            {pieceImage !== null &&
                <img src={pieceImage} alt="chess piece image" />
            }
        </div>
    );
};

export default Cell;