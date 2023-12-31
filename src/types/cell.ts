interface IPosition {
    i:number,
    j:number,
}

export enum Pieces {
    pawn= "pawn",
    rook= "rook",
    knight= "knight",
    bishop= "bishop",
    queen= "queen",
    king= "king",
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
    position: IPosition,
    piece: Piece,
    color: Colors,
    selected: boolean,
    canMove: boolean,
    whiteKingCanMove: boolean,
    blackKingCanMove: boolean,
}