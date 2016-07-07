import configureStore from './store/configureStore';
import * as Actions from './actions/Actions';
import React from 'react';
import ReactDOM from 'react-dom';
import JapanContainer from './components/JapanContainer';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import '../scss/japan.scss';

const store = configureStore(fromJS({
  storage: JSON.parse(localStorage.getItem('japan')),
}));

window.store = store;

store.dispatch({
  type: 'SET_PAYOUTS',
  payload: [1000, 5000, 10000, 20000, 50000, 100000],
});

store.dispatch({
  type: 'SET_TEXTS',
  payload: {
    textHighLow: 'HIGH/LOW',
    textTouchNoTouch: 'TOUCH /NO-TOUCH',
    textEndInEndOut: 'END-IN/END-OUT',
    textStayInBreakOut: 'STAY-IN/BREAK-OUT',
    textJapanPeriodH: 'h',
    textJapanPeriodD: 'd',
    textJapanPeriodW: 'w',
    textJapanPeriodM: 'm',
    textJapanPeriodY: 'y',
    textBarriers: 'Barriers',
    textSell: 'Sell',
    textBuy: 'Buy',
  },
});

store.dispatch(Actions.getSymbols());

ReactDOM.render(<Provider store={store}>
    <JapanContainer /></Provider>, document.getElementById('app'));
