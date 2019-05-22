import React, {useEffect} from 'react';
import {DragDropContext} from 'react-beautiful-dnd'
import {connect} from 'react-redux';
import {onDrag} from "../utils/onDrag.js";
import AddingList from "./presentational/addingList.js";
import List from './list.js';
import {
  createNewList,
  createNewTask,
  updateListsAfterDragEnd,
  updateListsAndTasksDragEnd,
  deleteList,
  changeListName,
  editTask,
  deleteTask
} from '../actions/boardActions'
import '../assets/css/board.css';

function Board(props) {

  useEffect(() => {
    document.title = `Board ${props.board.name}`;
  });

  const onDragEnd = result => {
    let newState = onDrag(result, props.lists)
    if (newState !== undefined) {
      props.updateListsAfterDragEnd(newState)
    }
  }

  return (
    <div className='board'>
      <div className='boardName'>{props.board.name}</div>
        <AddingList
          createNewList={(input)=>props.createNewList(input, props.board.id)}
        />
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
                    deleteList={props.deleteList}
                    editTask={(taskID,input)=> props.editTask(taskID,input)}
                    deleteTask={(taskID, listID)=> props.deleteTask(taskID, listID)}
                    changeListName={(input) => props.changeListName(listID, input)}
                  />
                )
              })
            }
          </div>
        </DragDropContext>
      </div>
    )
}

const mapStateToProps = store => {
  return {lists: store.board.lists, tasks: store.board.tasks, boardLists: store.board.boardLists}
}

const mapDispatchToProps = dispatch => ({
  createNewList: (input, boardID) => dispatch(createNewList(input, boardID)),
  createNewTask: (id, input) => dispatch(createNewTask(id, input)),
  updateListsAfterDragEnd: (newLists) => dispatch(updateListsAfterDragEnd(newLists)),
  updateListsAndTasksDragEnd: (newLists, newTasks) => dispatch(updateListsAndTasksDragEnd(newLists, newTasks)),
  deleteList: (id, boardID) => dispatch(deleteList(id, boardID)),
  changeListName: (listID, input) => dispatch(changeListName(listID, input)),
  editTask: (taskID, input) => dispatch(editTask(taskID, input)),
  deleteTask: (taskID, listID) => dispatch(deleteTask(taskID, listID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);
