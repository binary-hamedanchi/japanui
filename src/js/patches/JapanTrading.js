import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as Actions from '../actions/Actions';
import configureStore from '../store/configureStore';
import JapanContainer from '../components/JapanContainer';

let store;
const appNode = document.getElementById('japan-app');

const start = () => {
  if (typeof store === 'object') {
    return false;
  }

  const storage = localStorage.japan ? JSON.parse(localStorage.japan) : {};
  store = configureStore({ storage });

  store.dispatch(Actions.getSymbols());
  ReactDOM.render(<Provider store={store}><JapanContainer /></Provider>, appNode);

  return true;
};


const stop = () => {
  if (typeof store !== 'object') {
    return false;
  }

  store.dispatch(Actions.close());
  store = undefined;
  // ReactDOM.unmountComponentAtNode(appNode);
  return true;
};

export default { start, stop };
