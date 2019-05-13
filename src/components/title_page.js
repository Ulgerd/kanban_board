import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Header from './header.js';
import {confirmAlert} from 'react-confirm-alert'; // Import
import CreatingNewBoard from './creatingNewBoard.js';
import Icon from './icon.js';
import '../assets/css/confirm.css'; // Import css

export default function TitlePage(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (boardID) => {
    confirmAlert({
      customUI: ({onClose}) => {
        return (<div className='react-confirm-alert'>
          <div className='react-confirm-alert-body'>
            <h1>Board removal</h1>
            <h3>Are you sure you want to delete this board?</h3>
            <div className='react-confirm-alert-button-group'>
              <button onClick={onClose}>No</button>
              <button onClick={() => {
                  props.deleteBoard(boardID);
                  onClose();
                }}>
                Yes, Delete it!
              </button>
            </div>
          </div>
        </div>);
      }
    });
  }

  useEffect(() => {
    document.title = `Title page`;
  });

  return (<div className='main_wrapper'>
    <Header/>
    <div className='create_new_board_wrapper'>
      {
        menuOpen
          ? <CreatingNewBoard
              onCloseClick = {() => setMenuOpen(!menuOpen)}
              onMenuClose = {(e) => setMenuOpen(e)}
              createNewBoard={props.createNewBoard}
            />
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
          <Icon
            name='XButton boardX'
            onClick = {(e) => {e.preventDefault(); submit(props.boards[key].id)}}
            fill='black'
            width='1em'
            height="1em"
            xlink='close'
          />
          {props.boards[key].name}
        </NavLink>
      </div>)
    }
  </div>)
}
