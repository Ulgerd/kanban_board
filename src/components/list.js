import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'
import Task from './presentational/task';
import Dropdown from './presentational/dropdown.js';
import AddingTask from './presentational/addingTask.js';
import '../assets/css/confirm.css';
import '../assets/css/list.css';

export default function List(props) {

  const [addingTask, setAddingTask] = useState(false);
  const [input, setInput] = useState(props.name);
  const [changingListName, setChangingListName] = useState(false);

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

            <Dropdown
              deleteList = {() => props.deleteList(props.id, props.boardID)}
              deleteTasks = {() => props.deleteTasks(props.id)}
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
