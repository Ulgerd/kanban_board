import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewBoard, deleteBoard } from './actions/titlePageActions'
import TitlePage from './components/titlePage';
import Board from './components/board';
import NoPage from './components/nopage';
import './assets/css/App.css';

class App extends Component {
  render() {
    let {createNewBoard, deleteBoard, boards} = this.props;
    return (
      <Router>
        <div className='App'>
          <Switch>

            <Route
              exact path='/'
              render={ ({ match }) =>
                <TitlePage
                  createNewBoard = {createNewBoard}
                  deleteBoard = {deleteBoard}
                  boards = {boards}
                />
              }
            />

            {
              Object.keys(boards).map(oneBoard =>
                <Route
                  key = {boards[oneBoard].id}
                  exact path={`/board/${this.props.boards[oneBoard].id}`}
                  render={ () => <Board board = {boards[oneBoard]} />}
                />
              )
            }
            <Route component={NoPage} />

          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    boards: store.titlePage.boards,
  }
}

const mapDispatchToProps = dispatch => ({
    createNewBoard: (input, boardColor) => dispatch(createNewBoard(input, boardColor)),
    deleteBoard: (boardID) => dispatch(deleteBoard(boardID))
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
