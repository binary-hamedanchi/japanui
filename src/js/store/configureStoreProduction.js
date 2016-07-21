import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Socket from '../utils/Socket';
import socketConfig from '../patches/socketConfig';
import SocketMiddleware from '../middleware/SocketMiddleware';
import StorageMiddleware from '../middleware/StorageMiddleware';
import { Map, fromJS } from 'immutable';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState = Map()) {
  const socket = new Socket(socketConfig());
  const finalCreateStore = compose(
    applyMiddleware(thunk, SocketMiddleware(socket), StorageMiddleware))(createStore);

  const store = finalCreateStore(rootReducer, fromJS(initialState));
  socket.onLost = () => store.dispatch({ type: 'DELETE_USER' });

  return store;
}
