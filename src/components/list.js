import React, {useState} from 'react';
import {Droppable} from 'react-beautiful-dnd'
import {confirmAlert} from 'react-confirm-alert'; // Import
import Task from './task';
import Icon from './icon.js';
import '../assets/css/confirm.css'; // Import css

export default function List(props) {

  const [input, setInput] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [addingTask, setAddingTask] = useState(false);

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
                    onClose();
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
      setAddingTask(false)
      createNewChild();
    }
  }

  const createNewChild = () => {
    props.onCreateNewChild(props.id, input);
    setInput('')
  }

  return (
      <div className='list_wrapper'>

        <div className='list'>
          <div className='list_header'>{props.name}
            {dropdown ?
              <Icon
                name = 'arrow_up'
                onClick = {() => setDropdown(false)}
                fill='black'
                width='1em'
                height="1em"
                xlink = 'arrow_up'
              /> :
              <Icon
                name = 'arrow_down'
                onClick = {() => setDropdown(true)}
                fill='black'
                width='1em'
                height="1em"
                xlink = 'arrow_down'
              />
            }
            {
              dropdown ?
              <div className='dropdown'>
                <div className='dropdown_menu_item' onClick={() => setAddingTask(true)}>Add new task</div>
                <div className='dropdown_menu_item' onClick={submit}>Delete this list</div>
                <div className='dropdown_menu_item' onClick={() => props.deleteTasks(props.id)}>Delete checked tasks</div>
              </div> : <div></div>
            }
          </div>
          {addingTask ? <div>
            <input onChange={(e) => {
                setInput(e.target.value)
              }} value={input} onKeyPress={onEnter}
              className='list_input'/>
            <button className="list_submit no_select" onClick={() => {setAddingTask(false); createNewChild()}} disabled={!input}>
              Submit
            </button>
            </div> :
            <div></div>}
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

                    <div key={task.id}>
                      <Task
                        onClick={() => props.taskChecked(task.id)}
                        task={task}
                        index={index}
                        listID = {props.id}
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
