import nanoid from 'nanoid';
import produce from "immer";

export const initialState = {
  boards: {}
}

export function titlePageReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_NEW_BOARD':
      let id = nanoid(4);
      return produce(state, draft => {
        draft.boards[id] = {
          id: id,
          name: action.input,
          className: action.boardColor
        }
      })

    case 'DELETE_BOARD':
      return produce(state, draft => {
        delete draft.boards[action.boardID];
      })

    default:
      return state
  }
}
