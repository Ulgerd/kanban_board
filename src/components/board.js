import React, {useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';

import {
  createNewList,
  createNewTask,
  updateListsAfterDragEnd,
  taskChecked,
  updateListsAndTasksDragEnd,
  deleteList
} from '../actions/boardActions'
import Header from './header.js';
import List from './list';
import Icons from '../icons/icons.svg';

import '../css/board.css';

function Board(props) {

  const [input, setInput] = useState('');
  const [addingList, setAddingList] = useState('');

  const onDragEnd = result => {
    let {destination, source, draggableId} = result;

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    //Moving to trash
    if (destination.droppableId === 'trash') {
      let toDelete = props.lists[source.droppableId].taskIDs.indexOf(draggableId);

      let from = props.lists[source.droppableId].taskIDs.slice(0, toDelete);
      let to = props.lists[source.droppableId].taskIDs.slice(toDelete + 1, props.lists[source.droppableId].taskIDs.length);
      let newLists = {
        ...props.lists,
        [source.droppableId]: {
          ...props.lists[source.droppableId],
          taskIDs: [
            ...from,
            ...to
          ]
        }
      };
      let newTasks = {
        ...props.tasks
      };
      delete newTasks[draggableId];

      props.updateListsAndTasksDragEnd(newLists, newTasks)
      return
    }

    const start = props.lists[source.droppableId]
    const finish = props.lists[destination.droppableId]

    //Moving in one list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIDs)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newList = {
        ...start,
        taskIDs: newTaskIds
      }

      const newState = {
        ...props.lists,
        [source.droppableId]: newList
      }

      props.updateListsAfterDragEnd(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIDs)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIDs: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIDs)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIDs: finishTaskIds
    }

    const newState = {
      ...props.lists,
      [source.droppableId]: newStart,
      [destination.droppableId]: newFinish
    }
    props.updateListsAfterDragEnd(newState)
  }

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      createNewList();
    }
  }

  const createNewList = () => {
    setInput('');
    setAddingList(false);
    props.createNewList(input, props.board.id);
  }

  return (
    <div className='board'>

      <Header/>

      <div className='boardName'>{props.board.name}</div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'trash'} type="TASK">
            {
              (provided, snapshot) => (
                <div
                  className='trash'
                  ref={provided.innerRef}
                  data-tip="data-tip"
                  data-for='trash'
                >
                  <svg
                    fill={snapshot.isDraggingOver
                      ? 'rgb(185, 0, 0)'
                      : 'rgb(245, 245, 245)'}
                    width='34'
                    height="40"
                  >
                    <use xlinkHref={`${Icons}#trash`}/>
                    {provided.placeholder}
                  </svg>
                </div>
              )
            }
          </Droppable>

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
                      className='create_list_button no_select'
                      onClick={createNewList}
                      disabled={!input}
                    >
                      Create
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

        <ReactTooltip id='trash'>
          <span>You can throw your tasks here</span>
        </ReactTooltip>

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
  deleteList: (id, boardID) => dispatch(deleteList(id, boardID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);
