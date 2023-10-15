import cell from "../components/board/cell";

/*interface IPosition {
    x:number,
    y:number,
}*/

export enum Pieces {
    pawn= "pawn",
    rook= "rook",
    knight= "knight",
    bishop= "bishop",
    queen= "queen",
    king= "king",
    none= "none",
}

export interface Piece {
    piece?: Pieces,
    color?: Colors,
}

export enum Colors {
    black = "black",
    white = "white",
}

export interface ICell {
    //position: IPosition,
    piece: Piece,
    color: Colors,
    selected: boolean,
    canMove: boolean,
}