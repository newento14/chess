import React, {FC, useEffect, useState} from 'react';
import {Colors, ICell, Pieces} from "../types/cell";
import Cell from "./board/cell";
import '../styles/board.css'

const Board: FC = () => {
    const [board, setBoard] = useState<ICell[][]>([[]])

    function fillBoard() {
        const tempBoard: ICell[][] = [];
        for (let i = 0; i < 8; ++i) {
            const temp: ICell[] = [];
            for (let j = 0; j < 8; ++j) {
                let color: Colors = Colors.white;
                if ((i + j) % 2 !== 0)
                    color = Colors.black;

                temp.push({color: color, piece: {}, selected:false, canMove: false});
            }
            tempBoard.push(temp);
        }

        tempBoard[0][0].piece.piece = Pieces.rook;
        tempBoard[0][0].piece.color = Colors.black;

        tempBoard[0][7].piece.piece = Pieces.rook;
        tempBoard[0][7].piece.color = Colors.black;

        tempBoard[7][0].piece.piece = Pieces.rook;
        tempBoard[7][0].piece.color = Colors.white;

        tempBoard[7][7].piece.piece = Pieces.rook;
        tempBoard[7][7].piece.color = Colors.white;


        tempBoard[0][1].piece.piece = Pieces.knight;
        tempBoard[0][1].piece.color = Colors.black;

        tempBoard[0][6].piece.piece = Pieces.knight;
        tempBoard[0][6].piece.color = Colors.black;

        tempBoard[7][1].piece.piece = Pieces.knight;
        tempBoard[7][1].piece.color = Colors.white;

        tempBoard[7][6].piece.piece = Pieces.knight;
        tempBoard[7][6].piece.color = Colors.white;


        tempBoard[0][2].piece.piece = Pieces.bishop;
        tempBoard[0][2].piece.color = Colors.black;

        tempBoard[0][5].piece.piece = Pieces.bishop;
        tempBoard[0][5].piece.color = Colors.black;

        tempBoard[7][2].piece.piece = Pieces.bishop;
        tempBoard[7][2].piece.color = Colors.white;

        tempBoard[7][5].piece.piece = Pieces.bishop;
        tempBoard[7][5].piece.color = Colors.white;


        tempBoard[0][3].piece.piece = Pieces.queen;
        tempBoard[0][3].piece.color = Colors.black;

        tempBoard[7][3].piece.piece = Pieces.queen;
        tempBoard[7][3].piece.color = Colors.white;


        tempBoard[0][4].piece.piece = Pieces.king;
        tempBoard[0][4].piece.color = Colors.black;

        tempBoard[7][4].piece.piece = Pieces.king;
        tempBoard[7][4].piece.color = Colors.white;


        for (let i = 0; i < 8; ++i) {
            tempBoard[1][i].piece.piece = Pieces.pawn;
            tempBoard[1][i].piece.color = Colors.black;

            tempBoard[6][i].piece.piece = Pieces.pawn;
            tempBoard[6][i].piece.color = Colors.white;
        }

        setBoard(tempBoard);
    }

    useEffect(() => {
        fillBoard();
    }, []);

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                row.map((x, index) => (
                   <Cell color={x.color} piece={x.piece} key={rowIndex + index}/>
                ))
            ))}
        </div>
    );
};

export default Board;