import React, {useState} from 'react';
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
              type='text'
              name='addAList'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={onEnter}
              placeholder="List name, a.g. 'To Do'"
              maxLength="15"
            />
            <button
              className='cancel_list_button no_select'
              onClick={onCancel}
            >
              Cancel
            </button>
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
            Add a list...
          </div>
    }
  </div>)
}
