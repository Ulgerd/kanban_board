import nanoid from 'nanoid';

export const initialState = {
  addingList: false,
  tasks: {},
  listsOrder: [],
  lists: {},
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADDING_LIST':
      return {
        ...state,
        addingList: !state.addingList
      }

    case 'UPDATE_LISTS':
      return {
        ...state,
        lists: action.newLists
      }
    case 'CREATE_NEW_LIST':
      let id = nanoid(4);
      return {
        ...state,
        addingList: false,
        listsOrder: [...state.listsOrder, id],
        lists: {
            ...state.lists,
            [id]: {
              name: action.input,
              taskIDs: []
            }
        },
      }
    case 'CREATE_NEW_TASK':
      let taskId = nanoid(4);
      let newState = {};
      Object.keys(state.lists).map(oneList => {
        if (oneList === action.id) {
          newState = {
            ...state,
            tasks: {
              ...state.tasks,
              [taskId]: {
                id: taskId,
                content: action.input,
                checked: false
              }
            },
            lists: {
              ...state.lists,
              [oneList]: {
                ...state.lists[oneList],
                taskIDs: [
                  ...state.lists[oneList].taskIDs,
                  taskId
                ]
              }
            }
          }

        }
      })
      return newState;
    default:
      return state
  }
}
