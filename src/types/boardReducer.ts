import {ICell, Piece} from "./cell";

export interface IState {
    board: ICell[][],
    selectedCell: ICell | null,
}

export enum ActionTypes {
    SET_BOARD = "SET_BOARD",
    SET_PIECE = "SET_PIECE",
}

interface FetchSetBoard {
    type: ActionTypes.SET_BOARD,
    payload: ICell[][],
}

interface FetchSetSelectedPiece {
    type: ActionTypes.SET_PIECE,
    payload: ICell,
}

export type Actions = FetchSetBoard | FetchSetSelectedPiece;