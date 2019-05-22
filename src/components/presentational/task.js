import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import '../.././assets/css/task.css';

export default function Task(props) {

    return (
      <Draggable
        draggableId={props.task.id}
        index={props.index}
      >
        {(provided, snapshot) => (
          <div
            className='task_content'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className = {props.task.checked ? 'task _checked':'task'}
              onClick={props.onClick}
            >
              {props.task.content}
            </div>
            <div
              className='task_menu'

            >···</div>
          </div>
        )}
      </Draggable>
    )
  }
