import {Actions, ActionTypes, IState} from "../../types/boardReducer";
import {Colors} from "../../types/cell";

const defaultState :IState = {
    board: [[]],
    selectedCell: null,
}

export const boardReducer = (state = defaultState,  action:Actions) => {
    switch (action.type) {
        case ActionTypes.SET_BOARD: {
            return {
                ...state,
                board: action.payload,
            }
        }
        case ActionTypes.SET_PIECE: {
            return {
                ...state,
                selectedCell: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}