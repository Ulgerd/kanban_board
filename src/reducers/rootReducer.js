import { combineReducers } from 'redux';
import { titlePageReducer } from './titlePageReducer';
import { boardReducer } from './boardReducer';

export const rootReducer = combineReducers({
  titlePage: titlePageReducer,
  board: boardReducer,
})
