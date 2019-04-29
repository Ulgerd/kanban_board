import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
//redux stuff
import { toggleNewBoardMenu, inputChange, createNewBoard } from './actions/titlePageActions'

//components
import TitlePage from './components/title_page';
import Board from './components/board';
//css obviously
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <Route
              exact path='/'
              render={ ({ match }) =>
                <TitlePage
                  toggleNewBoardMenu = {this.props.toggleNewBoardMenu}
                  creatingNewBoard = {this.props.creatingNewBoard}
                  onInputChange = {this.props.inputChange}
                  createNewBoard = {this.props.createNewBoard}
                  boards = {this.props.boards}
                  input = {this.props.input}
                />
              }
            />

            {
              Object.keys(this.props.boards).map(oneBoard =>
                <Route
                  key = {this.props.boards[oneBoard].id}
                  exact path={`/board/${this.props.boards[oneBoard].id}`}
                  render={ () => <Board board = {this.props.boards[oneBoard]} />}
                />
              )
            }
          </Switch>
        </div>
      </Router>
    );
  }
}

// эта хрень возвращает тупо стейт
const mapStateToProps = store => {
  return {
    creatingNewBoard: store.titlePage.creatingNewBoard,
    input: store.titlePage.input,
    boards: store.titlePage.boards,
  }
}
// эта хрень возвращает функции
const mapDispatchToProps = dispatch => ({
    toggleNewBoardMenu: () => dispatch(toggleNewBoardMenu() ),
    inputChange: (input) => dispatch(inputChange(input.target.value)),
    createNewBoard: () => dispatch(createNewBoard()),
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
