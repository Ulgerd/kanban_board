import {updateLists} from "./updateLists.js";

export const updateTasks = (tasks, lists, listID) => {

  let newTasks = {
    ...tasks
  };

  let checkedTasks = []

  Object.keys(newTasks).map(task => {
    if (newTasks[task].checked === true) {
      checkedTasks.push(task)
    }
    return null;
  })

  let tasksToDelete = checkedTasks.filter((task) =>
    lists[listID].taskIDs.indexOf(task) >= 0);

  tasksToDelete.forEach(task => {
    delete newTasks[task];
  })

  let newLists = updateLists(tasksToDelete, lists, listID);

  return [newLists, newTasks]
}
