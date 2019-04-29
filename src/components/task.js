import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd'


class Task extends Component {

  render() {
    console.log(this.props);
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            className = {this.props.task.checked ? 'task_checked':'task'}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={this.props.onClick}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    )
  }
}

export default Task;
