import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Socket from '../utils/Socket';
import socketConfig from '../patches/socketConfig';
import SocketMiddleware from '../middleware/SocketMiddleware';
import StorageMiddleware from '../middleware/StorageMiddleware';
import createLogger from 'redux-logger';
import { Map, fromJS } from 'immutable';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState = Map()) {
  const socket = new Socket(socketConfig());

  const logger = createLogger({
    stateTransformer: (state) => state && state.toJS(),
    predicate: (getState, action) => !action.skipLog,
  });

  const finalCreateStore = compose(
    applyMiddleware(
        thunk,
        SocketMiddleware(socket),
        StorageMiddleware,
        // logger,
    ),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);

  const store = finalCreateStore(rootReducer, fromJS(initialState));
  socket.onLost = () => store.dispatch({ type: 'DELETE_USER' });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
