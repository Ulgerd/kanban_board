import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd'
import Dropdown from './dropdown.js';
import '../.././assets/css/task.css';

export default function Task(props) {

  const [taskMenu, setTaskMenu] = useState(false);
  const [taskInput, setTaskInput] = useState(props.task.content);
  const [editTask, setEditTask] = useState(false);

  const onEnter = (e) => {
    if (e.key === 'Enter' && taskInput !== '') {
      setEditTask(false);
      props.editTask(props.taskID,taskInput);
    }
  }

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
              {editTask ?
                <input
                  className='task_name_input'
                  value={taskInput}
                  autoFocus
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyPress={onEnter}
                />
              :  <div className='task'>{taskInput}</div>}
            {
              taskMenu ?
              <Dropdown
                editTask = {() => {setEditTask(true); setTaskMenu(false)}}
                deleteTask = {() => props.deleteTask(props.taskID, props.listID)}
                taskInput = {(e)=>setTaskInput(e.target.value)}
              /> : <div></div>
            }
            {
              taskMenu ?
              <div
                className='task_menu_open'
                onClick = {() => setTaskMenu(!taskMenu)}
              >···</div> :
              <div
                className='task_menu'
                onClick = {() => setTaskMenu(!taskMenu)}
              >···</div>
            }
          </div>
        )}
      </Draggable>
    )
  }
