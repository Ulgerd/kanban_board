import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import Icon from './icon.js';

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
          >
            {props.task.content}
          </div>
        )}
      </Draggable>
    )
  }
