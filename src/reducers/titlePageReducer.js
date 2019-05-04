import nanoid from 'nanoid';

export const initialState = {
  boards: {},
}

export function titlePageReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_NEW_BOARD':
      let id = nanoid(4);
      return {
        boards: {
            ...state.boards,
            [id]: {
              id: id,
              name: action.input,
              className: action.boardColor
            }
        },
      }
    default:
      return state
  }
}
