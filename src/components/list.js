import React, {Component} from 'react';
import {Droppable} from 'react-beautiful-dnd'
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../css/confirm.css'; // Import css
import Task from './task';
import Icons from '../icons/icons.svg';

class List extends Component {
  state = {
    input: ''
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert'>
            <div className='react-confirm-alert-body'>
              <h1>List removal</h1>
              <h3>Are you sure you want to delete this list?</h3>
              <div className='react-confirm-alert-button-group'>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    this.props.deleteList(this.props.id, this.props.boardID);
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
    }

  onInputChildName = (input) => {
    this.setState({
      input: input.target.value
    })
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      this.createNewChild();
    }
  }

  createNewChild = () => {
    let {id} = this.props;
    let {input} = this.state;
    this.props.onCreateNewChild(id, input);
    this.setState({input: ''})
  }

  render() {
    let {name, id,tasks, taskChecked} = this.props;
    return (
      <div className = 'list_wrapper'>

        <div className='list'>
          <div className='list_header'>{name}</div>
          <div
            className='listXButton'
            onClick={this.submit}
          >
            <svg fill='black' width='1em' height="1em">
              <use xlinkHref={`${Icons}#close`}/>
            </svg>
          </div>
          <input
            onChange={this.onInputChildName}
            value={this.state.input}
            onKeyPress={this.onEnter}
          />
          <button
            className="no_select"
            onClick={this.createNewChild}
            disabled={!this.state.input}
          >
            Submit
          </button>
        </div>

        <div>
          <Droppable droppableId={id} type="TASK">
            {
              (provided, snapshot) => (
                <div
                  className='task_wrapper'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task
                      onClick={() => taskChecked(task.id)}
                      key={task.id}
                      task={task}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </div>

      </div>
    )
  }
}

export default List;
