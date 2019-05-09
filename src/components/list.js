import React, {useState} from 'react';
import {Droppable} from 'react-beautiful-dnd'
import {confirmAlert} from 'react-confirm-alert'; // Import
import '../css/confirm.css'; // Import css
import Task from './task';
import Icons from '../icons/icons.svg';

export default function List(props) {

  const [input, setInput] = useState('');
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
          <div className='list_header'>{props.name}</div>
          <div className='listXButton' onClick={submit}>
            <svg fill='black' width='1em' height="1em">
              <use xlinkHref={`${Icons}#close`}/>
            </svg>
          </div>
          <input onChange={(e) => {
              setInput(e.target.value)
            }} value={input} onKeyPress={onEnter}/>
          <button className="no_select" onClick={createNewChild} disabled={!input}>
            Submit
          </button>
        </div>

        <div>
          <Droppable droppableId={props.id} type="TASK">
            {
              (provided, snapshot) => (<div className='task_wrapper' ref={provided.innerRef} {...provided.droppableProps}>
                {props.tasks.map((task, index) => (<Task onClick={() => props.taskChecked(task.id)} key={task.id} task={task} index={index}/>))}
                {provided.placeholder}
              </div>)
            }
          </Droppable>
        </div>

    </div>
  )
}
