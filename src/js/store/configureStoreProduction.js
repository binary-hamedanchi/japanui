import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SocketMiddleware from '../middleware/SocketMiddleware';
import StorageMiddleware from '../middleware/StorageMiddleware';
import { Map, fromJS } from 'immutable';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState = Map()) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, SocketMiddleware(), StorageMiddleware))(createStore);

  const store = finalCreateStore(rootReducer, fromJS(initialState));
  return store;
}
