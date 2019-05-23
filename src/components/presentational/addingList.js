import React, {useState} from 'react';
import Icon from './icon.js';
import '../.././assets/css/addingList.css';

export default function AddingList(props) {

  const [addList, setAddList] = useState(false);
  const [input, setInput] = useState('');

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      onCreateNewList();
    }
  }

  const onCreateNewList = () => {
    setInput('');
    setAddList(false);
    props.createNewList(input);
  }

  const onCancel = () => {
    setInput('');
    setAddList(false);
  }

  return (<div>
    {
      addList
        ? <div
          className='create_a_list'>
            <input
              className='create_list_input'
              autoFocus
              type='text'
              name='addAList'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={onEnter}
              placeholder="List name, a.g. 'To Do'"
              maxLength="15"
            />
            <Icon
              name='boardX'
              onClick = {onCancel}
              fill='rgb(239, 239, 239)'
              width='1em'
              height='1em'
              xlink='close'
            />
            <button
              className='create_list_button no_select'
              onClick={onCreateNewList}
              disabled={!input}
            >
              Add
            </button>
          </div>
        : <div
            onClick={() => {setAddList(!addList)}}
            className='add_a_list no_select'
          >
            Create new list
          </div>
    }
  </div>)
}
