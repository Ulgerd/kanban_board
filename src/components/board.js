import React, {Component} from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { toggleAddListMenu } from '../actions/boardActions'
import nanoid from 'nanoid';

import List from './list';

class Board extends Component {
  state = {
    addingList: false,
    input: '',
    tasks: {},
    lists: {},
    listsOrder: []
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

    const start = this.state.lists[source.droppableId]
    const finish = this.state.lists[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIDs)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newList = {
        ...start,
        taskIDs: newTaskIds
      }

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [source.droppableId]: newList
        }
      }

      this.setState(newState)
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
      ...this.state,
      lists: {
        ...this.state.lists,
        [source.droppableId]: newStart,
        [destination.droppableId]: newFinish
      }
    }
    this.setState(newState)
  }

  onInputChange = (input) => {
    this.setState({input: input.target.value})
  }

  openAddlistMenu = () => {
    this.setState({addingList: true})
  }

  addList = () => {
    let id = nanoid(4);
    this.setState({
      addingList: false,
      input: '',
      listsOrder: [...this.state.listsOrder, id],
      lists: {
        ...this.state.lists,
        [id]: {
          name: this.state.input,
          taskIDs: []
        }
      }
    })
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.addList();
    }
  }

  createNewTask = (id, input) => {
    let {lists} = this.state;
    let taskId = nanoid(4);
    Object.keys(lists).map(oneList => {
      if (oneList === id) {
        this.setState({
          tasks: {
            ...this.state.tasks,
            [taskId]: {
              id: taskId,
              content: input,
              checked: false
            }
          },
          lists: {
            ...lists,
            [oneList]: {
              ...this.state.lists[oneList],
              taskIDs: [
                ...this.state.lists[oneList].taskIDs,
                taskId
              ]
            }
          }
        })
      }
      return null;
    })
  }

  onNoteCheck = (noteID, listID) => {
    let {lists} = this.state;
    this.setState({
      lists: {
        ...lists,
        [listID]: {
          ...lists[listID],
          childs: {
            ...lists[listID].childs,
            [noteID]: {
              ...lists[listID].childs[noteID],
              checked: !lists[listID].childs[noteID].checked
            }
          }
        }
      }
    })
  }

  render() {
    let {name} = this.props.board;
    return (
      <div className='board'>
      <div className='header'>header</div>

      <div className='boardName shadow'>{name}</div>

      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.listsOrder.map(listID => {
          const list = this.state.lists[listID]
          const tasks = list.taskIDs.map(
            taskId => this.state.tasks[taskId]
          )

          return (
            <List key={listID} id={listID} name={list.name} tasks={tasks} onCreateNewChild={this.createNewTask} onCheck= {this.onNoteCheck} />
          )
        })}
      </DragDropContext>

      {
        this.props.addingList
          ? <div className='create_a_list'>
              <input className='create_list_input' type='text' name='addAList' onChange={this.onInputChange} onKeyPress={this.onEnter} placeholder="List name, a.g. 'Monday'"/>
              <button className='create_list_button' onClick={this.addList} disabled={!this.state.input}>Create</button>
            </div>
          : <div onClick={toggleAddListMenu} className='add_a_list'>Add a list...</div>
      }
    </div>)
  }
}

// эта хрень возвращает тупо стейт
const mapStateToProps = store => {
  console.log(store);
  return {
    addingList: store.board.addingList,
    // input: store.input,
    // boards: store.boards,
  }
}
// эта хрень возвращает функции
const mapDispatchToProps = dispatch => ({
    toggleAddListMenu: () => dispatch(toggleAddListMenu() ),
    // inputChange: (input) => dispatch(inputChange(input.target.value)),
    // createNewBoard: () => dispatch(createNewBoard()),
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
