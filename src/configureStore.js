import {compose, createStore} from 'redux';
import persistState from 'redux-sessionstorage'
import { rootReducer } from './reducers/rootReducer';

const createPersistentStore = compose(
  persistState()
)(createStore)

export const store = createPersistentStore(rootReducer, {})
