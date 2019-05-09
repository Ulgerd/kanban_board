import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Header from './header.js';
import Icons from '../icons/icons.svg';

export default function TitlePage(props) {

  const [input, setInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [boardColor, setboardColor] = useState(1);

  const onEnter = (e) => {
    if (e.key === 'Enter' && input !== '') {
      createNewBoard();
    }
  }

  const createNewBoard = () => {
    props.createNewBoard(input, boardColor);
    setInput('');
    setMenuOpen(false);
    setboardColor(1);
  }

  return (
    <div className='main_wrapper'>
      <Header/>
      <div className='create_new_board_wrapper'>
        {
          menuOpen
            ? <div className='creatingNewBoard'>

                <div className='creatingNewBoard_header no_select'>
                  <div>Creating a board</div>
                  <div
                    className='XButton'
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <svg
                      fill='white'
                      width='25'
                      height="25"
                    >
                      <use xlinkHref={`${Icons}#close`}/>
                    </svg>
                  </div>
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
                  <select onChange={(e) => setboardColor(e.target.value)}>
                    <option value="1">Marble</option>
                    <option value="2">Winter</option>
                    <option value="3">Blu</option>
                    <option value="4">Polished steel</option>
                    <option value="5">Titanium</option>
                  </select>

                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className='cancelButton no_select'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createNewBoard}
                    disabled={!input}
                    className='createButton no_select'
                  >
                    Create
                  </button>
                </div>
              </div>
            : <div
              onClick={() => setMenuOpen(!menuOpen)}
              className='createNewBoard no_select'
            >
              Create new board
            </div>
        }
      </div>

      {
        Object.keys(props.boards).map(key =>
          <div
            className={`board_${props.boards[key].className} board_elem`}
            key={props.boards[key].id}
          >
            <NavLink
              to={`/board/${props.boards[key].id}`}
              className='navLink'
            >
              {props.boards[key].name}
            </NavLink>
          </div>
        )
      }

    </div>
  )
}
