import {
  CREATE_NEW_LIST,
  CREATE_NEW_TASK,
  UPDATE_LISTS,
  UPDATE_LISTS_AND_TASKS,
  DELETE_LIST,
  CHANGE_LIST_NAME,
  EDIT_TASK,
  DELETE_TASK
 } from './actionTypes';

export function createNewList(input, boardID) {
  return {
    type: CREATE_NEW_LIST,
    input,
    boardID
  }
}

export function changeListName(listID, input) {
  return {
    type: CHANGE_LIST_NAME,
    listID,
    input
  }
}

export function createNewTask(id, input) {
  return {
    type: CREATE_NEW_TASK,
    input,
    id
  }
}

export function updateListsAfterDragEnd(newLists) {
  return {
    type: UPDATE_LISTS,
    newLists
  }
}

export function editTask(taskID, input) {
  return {
    type: EDIT_TASK,
    taskID,
    input,
  }
}

export function deleteTask(taskID, listID) {
  return {
    type: DELETE_TASK,
    taskID,
    listID
  }
}

export function updateListsAndTasksDragEnd(newLists, newTasks) {
  return {
    type: UPDATE_LISTS_AND_TASKS,
    newLists,
    newTasks
  }
}

export function deleteList(listID, boardID) {
  return {
    type: DELETE_LIST,
    listID,
    boardID
  }
}
