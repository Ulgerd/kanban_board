import React, {Component} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { createNewList, createNewTask, updateListsAfterDragEnd, taskChecked, updateListsAndTasksDragEnd, deleteList } from '../actions/boardActions'
import Header from './header.js';
import Icons from '../icons/icons.svg';


import List from './list';

class Board extends Component {

  state = {
    input: '',
    addingList: false,
  }

  onInputChange = (input) => {
    this.setState({
      input: input.target.value
    })
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    //Moving to trash
    if (destination.droppableId === 'trash') {
      let { lists, tasks } = this.props;
      let toDelete = lists[source.droppableId].taskIDs.indexOf(draggableId);

      let from = lists[source.droppableId].taskIDs.slice(0, toDelete);
      let to = lists[source.droppableId].taskIDs.slice(toDelete+1, lists[source.droppableId].taskIDs.length);
      let newLists = {
        ...lists,
        [source.droppableId]: {
          ...lists[source.droppableId],
          taskIDs: [
          ...from, ...to
          ]
        }
      };
      let newTasks = {
        ...tasks
      };
      delete newTasks[draggableId];

      this.props.updateListsAndTasksDragEnd(newLists, newTasks)
      return
    }

    const start = this.props.lists[source.droppableId]
    const finish = this.props.lists[destination.droppableId]

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
        ...this.props.lists,
        [source.droppableId]: newList
      }

      this.props.updateListsAfterDragEnd(newState)
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
        ...this.props.lists,
        [source.droppableId]: newStart,
        [destination.droppableId]: newFinish
      }
    this.props.updateListsAfterDragEnd(newState)

  }

  toggleAddListMenu = () => {
    this.setState({
      addingList: !this.state.addingList
    })
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      this.createNewList();
    }
  }

  createNewList = () => {
    this.setState({
      input: '',
      addingList: false
    })
    this.props.createNewList(this.state.input, this.props.board.id);
  }

  render() {
    let {name, id} = this.props.board;
    let currentLists = (this.props.boardLists[this.props.board.id] === undefined) ? [] :
     this.props.boardLists[this.props.board.id];
     console.log(this.props);
    return (
      <div className='board'>
      <Header />

      <div className='boardName'>{name}</div>

      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={'trash'} type="TASK">
          {(provided, snapshot) => (
            <div
              className = 'trash'
              ref={provided.innerRef}
              data-tip data-for='trash'
            >
              <svg
                fill={snapshot.isDraggingOver ? 'blue': 'white'}
                width='34'
                height="40"
              >
                <use xlinkHref={`${Icons}#trash`} />
                {provided.placeholder}
              </svg>
           </div>
          )}
        </Droppable>

        <div className='all_lists_wrapper'>
          {currentLists.map(listID => {
            const list = this.props.lists[listID]
            const tasks = list.taskIDs.map(
              taskId => this.props.tasks[taskId]
            )

            return (
              <List
                key={listID}
                id={listID}
                boardID = {id}
                name={list.name}
                tasks={tasks}
                onCreateNewChild={this.props.createNewTask}
                taskChecked={this.props.taskChecked}
                deleteList={this.props.deleteList}
              />
            )
          })}

        {
          this.state.addingList
            ? <div className='create_a_list'>
                <input
                  className='create_list_input'
                  type='text'
                  name='addAList'
                  onChange={this.onInputChange}
                  onKeyPress={this.onEnter}
                  placeholder="List name, a.g. 'Monday'"
                  maxLength="15"
                />
                <button
                  className='create_list_button no_select'
                  onClick={this.createNewList}
                  disabled={!this.state.input}
                >
                  Create
                </button>
              </div>
            : <div onClick={this.toggleAddListMenu} className='add_a_list no_select'>Add a list...</div>
        }
        </div>
        </DragDropContext>
      <ReactTooltip id='trash'>
        <span>You can throw your tasks here</span>
      </ReactTooltip>
    </div>)
  }
}

const mapStateToProps = store => {
  return {
    addingList: store.board.addingList,
    lists: store.board.lists,
    tasks: store.board.tasks,
    boardLists: store.board.boardLists
  }
}

const mapDispatchToProps = dispatch => ({
    createNewList: (input, boardID) => dispatch(createNewList(input, boardID)),
    createNewTask: (id, input) => dispatch(createNewTask(id, input)),
    updateListsAfterDragEnd: (newLists) => dispatch(updateListsAfterDragEnd(newLists)),
    updateListsAndTasksDragEnd: (newLists, newTasks) => dispatch(updateListsAndTasksDragEnd(newLists, newTasks)),
    taskChecked: (id) => dispatch(taskChecked(id)),
    deleteList: (id, boardID) => dispatch(deleteList(id, boardID)),
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
