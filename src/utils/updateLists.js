import produce from "immer";

export const updateLists = (tasksToDelete, lists, listID) => {
  return produce(lists, draft => {
    draft[listID].taskIDs = draft[listID].taskIDs.filter((task) =>
      tasksToDelete.indexOf(task) < 0
    ) // https://github.com/immerjs/immer/issues/115
  })
}
