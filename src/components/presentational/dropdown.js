import React, {useState} from 'react';
import {confirmAlert} from 'react-confirm-alert'; // Import
import Icon from './icon.js';
import '../.././assets/css/dropdown.css';

export default function Dropdown(props) {
  const [dropdown, setDropdown] = useState(false);

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
                    props.deleteList();
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

  return (
    <div>
    {dropdown ?
      <Icon
        name = 'gear_clicked'
        onClick = {() => setDropdown(false)}
        fill='lightblue'
        width='0.9em'
        height="0.9em"
        xlink = 'gear'
      /> :
      <Icon
        name = 'gear_toClick'
        onClick = {() => setDropdown(true)}
        fill='rgb(239, 239, 239)'
        width='0.9em'
        height="0.9em"
        xlink = 'gear'
      />
    }
    {
      dropdown ?
      <div className='dropdown'>
        <div
          className='dropdown_menu_item_upper no_select'
          onClick={submit}
        >
          Delete this list
        </div>
        <div
          className='dropdown_menu_item_lower no_select'
          onClick={() => {setDropdown(false); props.deleteTasks()}}
        >
          Delete checked tasks
        </div>
      </div> : <div></div>
    }
    </div>

  )
}
