import produce from "immer";

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

  let tasksToDelete = checkedTasks.filter((task) => lists[listID].taskIDs.indexOf(task) >= 0);

  tasksToDelete.forEach(task => {
    delete newTasks[task];
  })

  let newTaskIDs = lists[listID].taskIDs.filter((task) => tasksToDelete.indexOf(task) < 0);

  let newLists = produce(lists, draft => {
    draft[listID].taskIDs = newTaskIDs;
  })

  return [newLists, newTasks]
}
