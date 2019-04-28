import nanoid from 'nanoid';

export const initialState = {
  creatingNewBoard: false,
  input: '',
  boards: {},
}

export function titlePageReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        creatingNewBoard: !state.creatingNewBoard
      }
    case 'INPUT_CHANGE':
      return {
        ...state,
        input: action.payload
      }
    case 'CREATE_NEW_BOARD':
      let id = nanoid(4);
      return {
        ...state,
        creatingNewBoard: false,
        input: '',
        boards: {
            ...state.boards,
            [id]: {
              id: id,
              name: state.input,
            }
        },
      }
    default:
      return state
  }
}
