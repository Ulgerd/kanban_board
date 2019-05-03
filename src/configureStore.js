import { applyMiddleware, createStore } from 'redux';
import { save, load, clear } from 'redux-localstorage-simple';
import { rootReducer } from './reducers/rootReducer';

// const createStoreWithMiddleware = applyMiddleware( save() )( createStore );
//
// export const store = createStoreWithMiddleware( rootReducer, load() );

export const store = createStore( rootReducer );
