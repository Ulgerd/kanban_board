import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import Header from './header.js';
import Icons from '../icons/icons.svg';


class TitlePage extends Component {

  state = {
    input: '',
    toggleNewBoardMenu: false
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      this.createNewBoard();
    }
  }

  createNewBoard = () => {
    this.props.createNewBoard(this.state.input);
    this.setState({
      input: "",
      toggleNewBoardMenu: false
    })
  }

  onInputChange = (input) => {
    this.setState({
      input: input.target.value
    })
  }

  toggleNewBoardMenu = () => {
    this.setState({
      toggleNewBoardMenu: !this.state.toggleNewBoardMenu
    })
  }

  render() {
    let { boards } = this.props;
    return (
      <div className='main_wrapper'>
        <Header />
        <div className='create_new_board_wrapper'>
          {
            this.state.toggleNewBoardMenu
              ? <div className='creatingNewBoard'>
                  <div className='creatingNewBoard_header no_select'>
                    <div>Creating a board</div>
                    <div
                     className = 'XButton'
                     onClick={this.toggleNewBoardMenu}
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
                  <div className='creatingNewBoard_body no_select'>
                    <div>What shall we call the board?</div>
                    <input onChange={this.onInputChange} onKeyPress={this.onEnter} maxLength="15" />
                    <button onClick={this.toggleNewBoardMenu} className='cancelButton no_select'>Cancel</button>
                    <button onClick={this.createNewBoard} disabled={!this.state.input} className='createButton no_select'>Create</button>
                  </div>
                </div>
              : <div className='createNewBoard no_select' onClick={this.toggleNewBoardMenu}>Create new board</div>
          }
        </div>
          {Object.keys(boards).map(key => <div className = {`board_${boards[key].className} board_elem shadow`} key={boards[key].id}><NavLink className = 'navLink' to={`/board/${boards[key].id}`} >{boards[key].name}</NavLink></div>)}
      </div>
    )
  }
}

export default TitlePage;
