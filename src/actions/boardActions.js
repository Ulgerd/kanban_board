export function toggleAddListMenu() {
  return {
    type: 'ADDING_LIST',
  }
}

export function createNewList(input, boardID) {
  return {
    type: 'CREATE_NEW_LIST',
    input,
    boardID
  }
}

export function createNewTask(id, input) {
  return {
    type: 'CREATE_NEW_TASK',
    input,
    id
  }
}

export function updateListsAfterDragEnd(newLists) {
  return {
    type: 'UPDATE_LISTS',
    newLists
  }
}

export function taskChecked(taskID) {
  return {
    type: 'TASK_CHECKED',
    taskID
  }
}

export function updateListsAndTasksDragEnd(newLists, newTasks) {
  return {
    type: 'UPDATE_LISTS_AND_TASKS',
    newLists,
    newTasks
  }
}

export function deleteList(listID, boardID) {
  return {
    type: 'DELETE_LIST',
    listID,
    boardID
  }
}
