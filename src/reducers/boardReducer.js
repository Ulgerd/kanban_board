import nanoid from 'nanoid';

export const initialState = {
  addingList: false,
  input: '',
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADDING_LIST':
      return {
        ...state,
        addingList: !state.addingList
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
