export function toggleAddListMenu() {
  return {
    type: 'ADDING_LIST',
  }
}

export function createNewList(input) {
  return {
    type: 'CREATE_NEW_LIST',
    input
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
