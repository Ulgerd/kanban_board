import React, {useState} from 'react';
import Icon from './icon.js';

export default function CreatingNewBoard(props) {
  const [input, setInput] = useState('');
  const [boardColor, setBoardColor] = useState(1);

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      onCreateNewBoard();
    }
  }

  const onCreateNewBoard = () => {
    props.createNewBoard(input, boardColor);
    setInput('');
    props.onMenuClose(false);
    setBoardColor(1);
  }

  return (
    <div className='creatingNewBoard'>
    
        <div className='creatingNewBoard_header no_select'>
          <div>Creating a board</div>
            <Icon
              onClick = {props.onCloseClick}
              xlink = 'close'
            />
        </div>

        <hr size="1" color="#105B75"></hr>

        <div className='creatingNewBoard_body no_select'>
          <div>What shall we call the board?</div>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={onEnter}
            maxLength="15"
          />

          <label>
            Choose the board's theme:
          </label>
          <select onChange={(e) => setBoardColor(e.target.value)}>
            <option value="1">Marble</option>
            <option value="2">Winter</option>
            <option value="3">Blu</option>
            <option value="4">Polished steel</option>
            <option value="5">Titanium</option>
          </select>

          <button
            onClick={() => props.onMenuClose(false)}
            className='cancelButton no_select'
          >
            Cancel
          </button>
          <button
            onClick={onCreateNewBoard}
            disabled={!input}
            className='createButton no_select'
          >
            Create
          </button>
        </div>
      </div>
    )
  }
