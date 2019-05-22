import nanoid from 'nanoid';
import produce from "immer";

export const initialState = {
  tasks: {},
  listsOrder: [],
  lists: {},
  boardLists: {}
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_LIST':
      return produce(state, draft => {
        let bL = draft.boardLists[action.boardID];
        bL.splice(bL.findIndex(id =>
          id === action.listID), 1
        ); // Why splice? Here's the answer: https://github.com/immerjs/immer/issues/115
        delete draft.lists[action.listID];
      })

    case 'UPDATE_LISTS':
      return produce(state, draft => {
        draft.lists = action.newLists
      })

    case 'CHANGE_LIST_NAME':
      let a = produce(state, draft => {
        draft.lists[action.listID].name = action.input
      })
      return a;

    case 'UPDATE_LISTS_AND_TASKS':
      return produce(state, draft => {
        draft.lists = action.newLists
        draft.tasks = action.newTasks
      })

    case 'CREATE_NEW_LIST':
      let id = nanoid(4);

      let boardLists = (state.boardLists[action.boardID] === undefined)
        ? [id]
        : [...state.boardLists[action.boardID],
           id];

      return produce(state, draft => {
        draft.boardLists[action.boardID] = boardLists
        draft.lists[id] = {
          name: action.input,
          taskIDs: []
        }
      })

    case 'CREATE_NEW_TASK':
      let taskId = nanoid(4);
      let newState = {};
      Object.keys(state.lists).forEach(oneList => {
        if (oneList === action.id) {
          newState = produce(state, draft => {
            draft.tasks[taskId] = {
              id: taskId,
              content: action.input,
              checked: false
            }
            draft.lists[oneList].taskIDs.push(taskId)
          })
        }
        return null;
      })
      return newState;

    case 'TASK_CHECKED':
      let stateWithNewTasks = {}
      Object.keys(state.tasks).forEach(oneTask => {
        if (oneTask === action.taskID) {
          stateWithNewTasks = produce(state, draft => {
            draft.tasks[oneTask].checked = !draft.tasks[oneTask].checked
          })
        }
        return null;
      })
      return stateWithNewTasks;

    default:
      return state
  }
}
