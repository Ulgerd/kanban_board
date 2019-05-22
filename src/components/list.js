import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'
import {confirmAlert} from 'react-confirm-alert'; // Import
import Task from './presentational/task';
import Icon from './presentational/icon.js';
import AddingTask from './presentational/addingTask.js';
import '../assets/css/confirm.css';
import '../assets/css/list.css';

export default function List(props) {

  const [addingTask, setAddingTask] = useState(false);
  const [input, setInput] = useState(props.name);
  const [changingListName, setChangingListName] = useState(false);

  const submit = () => {
    confirmAlert({
      customUI: ({onClose}) => {
        return (
          <div className='react-confirm-alert'>
            <div className='react-confirm-alert-body'>
              <h1>List removal</h1>
              <h3>Are you sure you want to delete this list?</h3>
              <div className='react-confirm-alert-button-group'>
                <button onClick={onClose}>No</button>
                <button onClick={() => {
                  props.deleteList(props.id, props.boardID);
                  onClose()
                }}>
                  Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      setChangingListName(false);
      props.changeListName(input);
    }
  }

  return (
      <div className='list_wrapper'>
        <div className='list'>
          <div
            className='list_header no_select'
            onDoubleClick={() => setChangingListName(true)}
          >
            {
              changingListName ?
              <div>
                <input
                  className='list_name_input'
                  value={input}
                  autoFocus
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={onEnter}
                />
              </div> :
              <div className='list_header_pointer'>{props.name}</div>
            }
            <Icon
              name = 'list_X'
              onClick = {submit}
              fill='rgb(239, 239, 239)'
              width='0.9em'
              height="0.9em"
              xlink = 'close'
            />
          </div>
          {addingTask ?
            <AddingTask
              listID={props.id}
              addingTask={addingTask}
              setAddingTask={(e) => setAddingTask(e)}
              onCreateNewChild={props.onCreateNewChild}
            /> :
            <button
              className='newTaskButton'
              onClick={() => setAddingTask(true)}
            >New Task
            </button>
          }
        </div>
        <div>

          <Droppable droppableId={props.id} type="TASK">
            {
              (provided, snapshot) => (
                <div
                  className='task_wrapper'
                  ref={provided.innerRef} {...provided.droppableProps}
                >
                  {props.tasks.map((task, index) => (
                    <div
                      key={task.id}
                    >
                      <Task
                        task={task}
                        taskID = {task.id}
                        index={index}
                        listID = {props.id}
                        editTask = {(taskID, input) => {props.editTask(taskID, input)}}
                        deleteTask={(taskID, listID) => {props.deleteTask(taskID, listID)}}
                      />
                    </div>
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
