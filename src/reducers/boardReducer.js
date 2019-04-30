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

    case 'UPDATE_LISTS_AND_TASKS':
    console.log(action.newLists);
      return {
        ...state,
        lists: action.newLists,
        tasks: action.newTasks,
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

      case 'TASK_CHECKED':
      let stateWithNewTasks ={}
        Object.keys(state.tasks).map(oneTask => {
          if (oneTask === action.taskID) {
            stateWithNewTasks = {
              ...state,
              tasks: {
                ...state.tasks,
                [oneTask]: {
                  ...state.tasks[oneTask],
                  checked: !state.tasks[oneTask].checked
                }
              },
            }

          }
        })
        return stateWithNewTasks;
    default:
      return state
  }
}
