import nanoid from 'nanoid';

export const initialState = {
  addingList: false,
  tasks: {},
  listsOrder: [],
  lists: {},
  boardLists: {}
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADDING_LIST':
      return {
        ...state,
        addingList: !state.addingList
      }

    case 'DELETE_LIST':
      let newBoardLists = [
        ...state.boardLists[action.boardID]
      ]
      let toDelete = newBoardLists.indexOf(action.listID);
      let from = newBoardLists.slice(0, toDelete);
      let to = newBoardLists.slice(toDelete+1, newBoardLists.length)
      let newLists = {
        ...state.lists
      };
      delete newLists[action.listID];
      return {
        ...state,
        lists: newLists,
        boardLists: [...from, ...to],
      }

    case 'UPDATE_LISTS':
      return {
        ...state,
        lists: action.newLists
      }

    case 'UPDATE_LISTS_AND_TASKS':
      return {
        ...state,
        lists: action.newLists,
        tasks: action.newTasks,
      }

    case 'CREATE_NEW_LIST':
      let id = nanoid(4);
      let boardLists = (state.boardLists[action.boardID] === undefined) ?
      [id] : [...state.boardLists[action.boardID], id];

      return {
        ...state,
        addingList: false,
        boardLists: { ...state.boardLists,
          [action.boardID]: boardLists
        },
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
