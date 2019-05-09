import React from 'react';
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

export default function Task(props) {

    return (
      <Draggable
        draggableId={props.task.id}
        index={props.index}
      >
        {(provided, snapshot) => (
          <div
            className = {props.task.checked ? 'task _checked':'task'}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={props.onClick}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            {props.task.content}
          </div>
        )}
      </Draggable>
    )
  }
