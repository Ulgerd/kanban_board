import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import { createNewBoard } from './actions/titlePageActions'
import TitlePage from './components/title_page';
import Board from './components/board';
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
                  createNewBoard = {this.props.createNewBoard}
                  boards = {this.props.boards}
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

const mapStateToProps = store => {
  return {
    boards: store.titlePage.boards,
  }
}

const mapDispatchToProps = dispatch => ({
    createNewBoard: (input) => dispatch(createNewBoard(input)),
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
