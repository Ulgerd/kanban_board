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
        let arr = draft.lists[action.listID].taskIDs;

        arr.forEach(task => {
          delete draft.tasks[task];
        })

        delete draft.lists[action.listID];
      })

    case 'UPDATE_LISTS':
      return produce(state, draft => {
        draft.lists = action.newLists
      })

    case 'CHANGE_LIST_NAME':
      return produce(state, draft => {
        draft.lists[action.listID].name = action.input
      })

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
            }
            draft.lists[oneList].taskIDs.push(taskId)
          })
        }
        return null;
      })
      return newState;

    case 'EDIT_TASK':
      return produce(state, draft => {
        draft.tasks[action.taskID].content = action.input
      })

    case 'DELETE_TASK':
      Object.keys(state.lists).forEach(oneList => {
        if (oneList === action.listID) {
          newState = produce(state, draft => {
            delete draft.tasks[action.taskID]
            draft.lists[oneList].taskIDs = draft.lists[oneList].taskIDs.filter((task) =>
              task !== action.taskID
            )
          })
        }
        return null;
      })
      return newState;

    default:
      return state
  }
}
