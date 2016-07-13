import configureStore from './store/configureStore';
import * as Actions from './actions/Actions';
import React from 'react';
import ReactDOM from 'react-dom';
import JapanContainer from './components/JapanContainer';
import { Provider } from 'react-redux';
import '../scss/japan.scss';

const store = configureStore({
  storage: localStorage.japan ? JSON.parse(localStorage.japan) : {},
});

window.store = store;

store.dispatch(Actions.getSymbols());

ReactDOM.render(<Provider store={store}>
    <JapanContainer /></Provider>, document.getElementById('app'));
