import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SocketMiddleware from '../middleware/SocketMiddleware';
import StorageMiddleware from '../middleware/StorageMiddleware';
import createLogger from 'redux-logger';
import { Map, fromJS } from 'immutable';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState = Map()) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, SocketMiddleware(), StorageMiddleware, createLogger({
      stateTransformer: (state) => state && state.toJS(),
      predicate: (getState, action) => !action.skipLog,
    })),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);

  const store = finalCreateStore(rootReducer, fromJS(initialState));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
