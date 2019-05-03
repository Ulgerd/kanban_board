import nanoid from 'nanoid';

export const initialState = {
  boards: {},
}

export function titlePageReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_NEW_BOARD':
      let id = nanoid(4);
      let classForBackground = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      return {
        boards: {
            ...state.boards,
            [id]: {
              id: id,
              name: action.input,
              className: classForBackground
            }
        },
      }
    default:
      return state
  }
}
