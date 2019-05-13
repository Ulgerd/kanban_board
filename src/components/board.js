import React, {useState, useEffect} from 'react';
import {DragDropContext} from 'react-beautiful-dnd'
import {connect} from 'react-redux';
import produce from "immer";

import {
  createNewList,
  createNewTask,
  updateListsAfterDragEnd,
  taskChecked,
  updateListsAndTasksDragEnd,
  deleteList,
} from '../actions/boardActions'
import Header from './header.js';
import List from './list';

import '../assets/css/board.css';

function Board(props) {

  const [input, setInput] = useState('');
  const [addingList, setAddingList] = useState('');

  useEffect(() => {
    document.title = `Board ${props.board.name}`;
  });

  const deleteTasks = (listID) => {

    let newTasks = {
      ...props.tasks
    };

    let checkedTasks = []

    Object.keys(newTasks).map(task => {
      if (newTasks[task].checked === true) {
        checkedTasks.push(task)
      }
      return null;
    })

    let tasksToDelete = checkedTasks.filter(
      (task) => props.lists[listID].taskIDs.indexOf(task) >= 0
    );

    tasksToDelete.forEach(task => {
      delete newTasks[task];
    })

    let newTaskIDs = props.lists[listID].taskIDs.filter(
      (task) => tasksToDelete.indexOf(task) < 0
    );

    let newLists = produce(props.lists, draft => {
      draft[listID].taskIDs = newTaskIDs;
    })

    props.updateListsAndTasksDragEnd(newLists, newTasks)
    return
  }

  const onDragEnd = result => {

    let {destination, source, draggableId} = result;

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = props.lists[source.droppableId]
    const finish = props.lists[destination.droppableId]

    //Moving in one list
    if (start === finish) {

      let newTaskIds = Array.from(start.taskIDs)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      let newList = produce(start, draft => {
        draft.taskIDs = newTaskIds;
      })

      let newState = produce(props.lists, draft => {
        draft[source.droppableId] = newList;
      })

      props.updateListsAfterDragEnd(newState)
      return
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

    let newState = produce(props.lists, draft => {
      draft[source.droppableId] = newStart;
      draft[destination.droppableId] = newFinish;
    })

    props.updateListsAfterDragEnd(newState)
  }

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      onCreateNewList();
    }
  }

  const onCreateNewList = () => {
    setInput('');
    setAddingList(false);
    props.createNewList(input, props.board.id);
  }

  const onCancel = () => {
    setInput('');
    setAddingList(false);
  }

  return (
    <div className='board'>

      <Header/>

      <div className='boardName'>{props.board.name}</div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className='all_lists_wrapper'>

            {
              (
                (props.boardLists[props.board.id] === undefined)
                ? []
                : props.boardLists[props.board.id]).map(listID => {
                const list = props.lists[listID]
                const tasks = list.taskIDs.map(taskId => props.tasks[taskId])

                return (
                  <List
                    key={listID}
                    id={listID}
                    boardID={props.board.id}
                    name={list.name}
                    tasks={tasks}
                    onCreateNewChild={props.createNewTask}
                    taskChecked={props.taskChecked}
                    deleteList={props.deleteList}
                    deleteTasks={deleteTasks}
                  />
                )
              })
            }

            {
              addingList
                ? <div className='create_a_list'>
                    <input
                      className='create_list_input'
                      type='text'
                      name='addAList'
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      onKeyPress={onEnter}
                      placeholder="List name, a.g. 'To Do'"
                      maxLength="15"
                    />
                    <button
                    className='cancel_list_button no_select'
                    onClick={onCancel}
                    >
                    Cancel
                    </button>
                    <button
                      className='create_list_button no_select'
                      onClick={onCreateNewList}
                      disabled={!input}
                    >
                      Add
                    </button>
                  </div>
                : <div
                    onClick={() => {setAddingList(!addingList)}}
                    className='add_a_list no_select'
                  >
                    Add a list...
                  </div>
            }
          </div>
        </DragDropContext>
      </div>
    )
}

const mapStateToProps = store => {
  return {addingList: store.board.addingList, lists: store.board.lists, tasks: store.board.tasks, boardLists: store.board.boardLists}
}

const mapDispatchToProps = dispatch => ({
  createNewList: (input, boardID) => dispatch(createNewList(input, boardID)),
  createNewTask: (id, input) => dispatch(createNewTask(id, input)),
  updateListsAfterDragEnd: (newLists) => dispatch(updateListsAfterDragEnd(newLists)),
  updateListsAndTasksDragEnd: (newLists, newTasks) => dispatch(updateListsAndTasksDragEnd(newLists, newTasks)),
  taskChecked: (id) => dispatch(taskChecked(id)),
  deleteList: (id, boardID) => dispatch(deleteList(id, boardID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);
