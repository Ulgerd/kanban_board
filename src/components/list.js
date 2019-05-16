import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'
import Task from './presentational/task';
import Dropdown from './presentational/dropdown.js';
import AddingTask from './presentational/addingTask.js';
import '../assets/css/confirm.css';
import '../assets/css/list.css';

export default function List(props) {

  const [addingTask, setAddingTask] = useState(false);

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
          <AddingTask
            listID={props.id}
            addingTask={addingTask}
            setAddingTask={(e) => setAddingTask(e)}
            onCreateNewChild={props.onCreateNewChild}
          />
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
