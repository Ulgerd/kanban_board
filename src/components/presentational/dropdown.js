import React from 'react';
import '../.././assets/css/dropdown.css';

export default function Dropdown(props) {
  return (
    <div className='dropdown_wrapper'>
      <div className='dropdown'>
        <div className='dropdown_menu'>
          <div
            className='dropdown_menu_item_upper no_select'
            onClick={props.editTask}
          >
            Edit task
          </div>
          <div
            className='dropdown_menu_item_lower no_select'
            onClick={props.deleteTask}
          >
            Delete task
          </div>
        </div>
      </div>
    </div>
  )
}
