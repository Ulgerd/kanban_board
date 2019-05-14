import produce from "immer";

export const onDrag = (result, lists) => {
  let {destination, source, draggableId} = result;

  if (!destination) {
    return
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return
  }

  const start = lists[source.droppableId]
  const finish = lists[destination.droppableId]

  //Moving in one list
  if (start === finish) {

    let newTaskIds = Array.from(start.taskIDs)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    let newList = produce(start, draft => {
      draft.taskIDs = newTaskIds;
    })

    let newState = produce(lists, draft => {
      draft[source.droppableId] = newList;
    })

    return newState;
  }

  // Moving from one list to another
  let startTaskIds = Array.from(start.taskIDs)
  startTaskIds.splice(source.index, 1)

  let newStart = produce(start, draft => {
    draft.taskIDs = startTaskIds;
  })

  let finishTaskIds = Array.from(finish.taskIDs)
  finishTaskIds.splice(destination.index, 0, draggableId)

  let newFinish = produce(finish, draft => {
    draft.taskIDs = finishTaskIds;
  })

  let newState = produce(lists, draft => {
    draft[source.droppableId] = newStart;
    draft[destination.droppableId] = newFinish;
  })
  return newState;
}
