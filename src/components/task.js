import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd'

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}

class Task extends Component {

  render() {
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
            onClick={this.props.onClick}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    )
  }
}

export default Task;
