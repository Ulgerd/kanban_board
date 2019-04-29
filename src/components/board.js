import React, {Component} from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { toggleAddListMenu, createNewList, createNewTask, updateListsAfterDragEnd, taskChecked } from '../actions/boardActions'
import nanoid from 'nanoid';

import List from './list';

class Board extends Component {

  state = {
    input: '',
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

    const start = this.props.lists[source.droppableId]
    const finish = this.props.lists[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIDs)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newList = {
        ...start,
        taskIDs: newTaskIds
      }

      //dispatch
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

    //dispatch
    const newState = {
        ...this.props.lists,
        [source.droppableId]: newStart,
        [destination.droppableId]: newFinish
      }
    this.props.updateListsAfterDragEnd(newState)
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      this.createNewList();
    }
  }

  createNewList = () => {
    this.setState({
      input: ''
    })
    this.props.createNewList(this.state.input);
  }

  render() {
    console.log(this.state.input);
    let {name} = this.props.board;
    return (
      <div className='board'>
      <div className='header'>header</div>

      <div className='boardName shadow'>{name}</div>

      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.props.listsOrder.map(listID => {
          const list = this.props.lists[listID]
          const tasks = list.taskIDs.map(
            taskId => this.props.tasks[taskId]
          )

          return (
            <List
              key={listID}
              id={listID}
              name={list.name}
              tasks={tasks}
              onCreateNewChild={this.props.createNewTask}
              taskChecked={this.props.taskChecked}
            />
          )
        })}
      </DragDropContext>

      {
        this.props.addingList
          ? <div className='create_a_list'>
              <input
                className='create_list_input'
                type='text'
                name='addAList'
                onChange={this.onInputChange}
                onKeyPress={this.onEnter}
                placeholder="List name, a.g. 'Monday'"/>
              <button
                className='create_list_button'
                onClick={this.createNewList}
                disabled={!this.state.input}
              >
                Create
              </button>
            </div>
          : <div onClick={this.props.toggleAddListMenu} className='add_a_list'>Add a list...</div>
      }
    </div>)
  }
}

// эта хрень возвращает тупо стейт
const mapStateToProps = store => {
  console.log(store.board);
  return {
    addingList: store.board.addingList,
    input: store.board.input,
    listsOrder: store.board.listsOrder,
    lists: store.board.lists,
    tasks: store.board.tasks
  }
}
// эта хрень возвращает функции
const mapDispatchToProps = dispatch => ({
    toggleAddListMenu: () => dispatch(toggleAddListMenu() ),
    createNewList: (input) => dispatch(createNewList(input)),
    createNewTask: (id, input) => dispatch(createNewTask(id, input)),
    updateListsAfterDragEnd: (newLists) => dispatch(updateListsAfterDragEnd(newLists)),
    taskChecked: (id) => dispatch(taskChecked(id)),
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
