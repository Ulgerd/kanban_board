import produce from "immer";
import {swap} from "./swap.js";
import {insert} from "./insert.js";

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

    let newTaskIds = swap(source.index, destination.index, Array.from(start.taskIDs))

    let newList = produce(start, draft => {
      draft.taskIDs = newTaskIds;
    })

    let newState = produce(lists, draft => {
      draft[source.droppableId] = newList;
    })

    return newState;
  }

  // Moving from one list to another
  let startTaskIds = Array.from(start.taskIDs).filter(
    (item, i) => i !== source.index
  )

  let newStart = produce(start, draft => {
    draft.taskIDs = startTaskIds;
  })

  let finishTaskIds = insert(destination.index, draggableId, Array.from(finish.taskIDs))

  let newFinish = produce(finish, draft => {
    draft.taskIDs = finishTaskIds;
  })

  let newState = produce(lists, draft => {
    draft[source.droppableId] = newStart;
    draft[destination.droppableId] = newFinish;
  })
  return newState;
}
