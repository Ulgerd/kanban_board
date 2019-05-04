import nanoid from 'nanoid';

export const initialState = {
  tasks: {},
  listsOrder: [],
  lists: {},
  boardLists: {}
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_LIST':
      let currentBoardLists = [
        ...state.boardLists[action.boardID]
      ]
      let toDelete = currentBoardLists.indexOf(action.listID);
      let from = currentBoardLists.slice(0, toDelete);
      let to = currentBoardLists.slice(toDelete+1, currentBoardLists.length)
      let newLists = {
        ...state.lists
      };
      delete newLists[action.listID];

      return {
        ...state,
        lists: newLists,
        boardLists: {
          ...state.boardLists,
          [action.boardID]: [...from, ...to]
        }
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
      let boardLists =
        (state.boardLists[action.boardID] === undefined) ?
          [id] :
          [...state.boardLists[action.boardID], id];

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
        }
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
        return null;
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
          return null;
        })
      return stateWithNewTasks;

    default:
      return state
  }
}
