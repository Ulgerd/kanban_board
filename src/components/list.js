import React, {Component} from 'react';
import {Droppable} from 'react-beautiful-dnd'
import nanoid from 'nanoid';
import Task from './task';
import Icons from '../icons/icons.svg';

class List extends Component {
  state = {
    input: ''
  }

  onInputChildName = (input) => {
    this.setState({input: input.target.value})
  }

  createNewChild = () => {
    let {id} = this.props;
    let {input} = this.state;
    this.props.onCreateNewChild(id, input);
    this.setState({input: ''})
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      this.createNewChild();
    }
  }

  render() {
    let {name} = this.props;
    return (
      <div className = 'list_wrapper'>

        <div className='list'>
          <div className='list_header'>{name}</div>
          <div className='listXButton' onClick={() => {
              if (window.confirm('Are you sure you want to delete this list?'))
                this.props.deleteList(this.props.id)
            }}>
            <svg fill='black' width='25' height="25">
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
          <Droppable droppableId={this.props.id} type="TASK">
            {
              (provided, snapshot) => (<div className='task_wrapper' ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.map((task, index) => (<Task onClick={() => this.props.taskChecked(task.id)} key={task.id} task={task} index={index}/>))}
                {provided.placeholder}
              </div>)
            }
          </Droppable>
        </div>

      </div>
    )
  }
}

export default List;
