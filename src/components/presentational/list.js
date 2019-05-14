import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'
import Task from './task';
import Dropdown from './dropdown.js';
import '../../assets/css/confirm.css'; // Import css

export default function List(props) {

  const [input, setInput] = useState('');
  const [addingTask, setAddingTask] = useState(false);

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
          <div className='list_header'>
          {props.name}
          <Dropdown
            deleteList = {() => props.deleteList(props.id, props.boardID)}
            setAddingTask = {() => setAddingTask(true)}
            deleteTasks = {() => props.deleteTasks(props.id)}
          />
          </div>
          {addingTask ? <div>
            <input
              onChange={(e) => {setInput(e.target.value)}}
              value={input}
              onKeyPress={onEnter}
              className='list_input'
            />
            <button
              className="list_submit no_select"
              onClick={() => {setAddingTask(false); createNewChild()}}
              disabled={!input}
            >
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
