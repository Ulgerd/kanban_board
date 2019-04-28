import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import Icons from '../icons/icons.svg';


class TitlePage extends Component {

  render() {
    let {
      toggleNewBoardMenu,
      creatingNewBoard,
      onInputChange,
      createNewBoard,
      boards,
      input
    } = this.props;
    return (
      <div  className='main_wrapper'>
        <div className='header'>header</div>
        <div className='create_new_board_wrapper'>
          {
            creatingNewBoard
              ? <div className='creatingNewBoard'>
                  <div className='creatingNewBoard_header'>
                    <div>Creating a board</div>
                    <div
                    className = 'XButton'
                     onClick={toggleNewBoardMenu}
                   >
                     <svg
                       fill='white'
                       width='25'
                       height="25"
                     >
                       <use xlinkHref={`${Icons}#close`} />
                     </svg>
                   </div>

                  </div>
                  <hr size="1" color="#105B75"></hr>
                  <div className='creatingNewBoard_body'>
                    <div>What shall we call the board?</div>
                    <input onChange={onInputChange}/>
                    <button onClick={toggleNewBoardMenu} className='cancelButton'>Cancel</button>
                    <button onClick={createNewBoard} disabled={!input} className='createButton'>Create</button>
                  </div>
                </div>
              : <div className='createNewBoard' onClick={toggleNewBoardMenu}>Create new board</div>
          }
        </div>
          {Object.keys(boards).map(key => <div className = 'board_elem shadow' key={boards[key].id}><NavLink className = 'navLink' to={`/board/${boards[key].id}`} >{boards[key].name}</NavLink></div>)}
      </div>
    )
  }
}

export default TitlePage;
