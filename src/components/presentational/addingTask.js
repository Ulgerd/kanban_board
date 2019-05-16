import React, {useState} from 'react';
import '../.././assets/css/addingTask.css';

export default function AddingTask(props) {

  const [input, setInput] = useState('');

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      props.setAddingTask(false)
      createNewChild();
    }
  }

  const createNewChild = () => {
    props.onCreateNewChild(props.listID, input);
    setInput('')
  }

  return (<div>
    {props.addingTask ? <div>
      <input
        onChange={(e) => {setInput(e.target.value)}}
        value={input}
        onKeyPress={onEnter}
        className='create_task_input'
        placeholder='Describe your task here'
      />
      <button
        className="task_cancel_button no_select"
        onClick={() => {props.setAddingTask(false)}}
      >
        Cancel
      </button>
      <button
        className="task_add_button no_select"
        onClick={() => {props.setAddingTask(false); createNewChild()}}
        disabled={!input}
      >
        Add
      </button>
      </div> :
      <div></div>}
  </div>)
}
