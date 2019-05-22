import React, {useState} from 'react';
import Icon from './icon.js';
import Select from 'react-select';
import '../.././assets/css/creatingNewBoard.css';

const options = [
  { value: '1', label: 'Marble' },
  { value: '2', label: 'Winter' },
  { value: '3', label: 'Blu' },
  { value: '4', label: 'Polished steel' },
  { value: '5', label: 'Titanium' }
];

export default function CreatingNewBoard(props) {
  const [input, setInput] = useState('');
  const [boardColor, setBoardColor] = useState(options[2]);

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      onCreateNewBoard();
    }
  }

  const onCreateNewBoard = () => {
    props.createNewBoard(input, boardColor.value);
    setInput('');
    props.onMenuClose(false);
    setBoardColor(1);
  }

  return (
    <div className='creatingNewBoard'>
      <div className='creatingNewBoard_margin'>
          <div className='creatingNewBoard_header no_select'>
            <div>New board</div>
              <Icon
                onClick = {props.onCloseClick}
                xlink = 'close'
                width='0.7em'
                height='0.7em'
             />
          </div>

          <hr size="1" color="#323232"></hr>

          <div className='creatingNewBoard_body no_select'>
            <div className='creatingNewBoard_body_title no_select'>Board name</div>
            <input
              autoFocus
              className='creatingNewBoard_body_input no_select'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={onEnter}
              maxLength="15"
            />

            <label className='creatingNewBoard_body_label no_select'>
              Board theme
            </label>
            <Select
              defaultValue={options[2]}
              onChange={(e) => setBoardColor(e)}
              options={options}
              className='creatingNewBoard_body_select no_select'
              classNamePrefix="react-select"
            />
            <button
              onClick={onCreateNewBoard}
              disabled={!input}
              className='createButton no_select'
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  }
