import configureStore from './store/configureStore';
import * as Actions from './actions/Actions';
import React from 'react';
import ReactDOM from 'react-dom';
import JapanContainer from './components/JapanContainer';
import { Provider } from 'react-redux';
import '../scss/japan.scss';

const store = configureStore();

const storage = localStorage.getItem('japan') && JSON.parse(localStorage.getItem('japan'));
if (storage) {
  store.dispatch({
    type: 'SET_STORAGE',
    payload: storage,
  });
}

window.store = store;

store.dispatch({
  type: 'SET_PAYOUTS',
  payload: [1000, 5000, 10000, 20000, 50000, 100000],
});

store.dispatch({
  type: 'SET_TEXT',
  payload: {
    textHighLow: 'HIGH/LOW',
    textTouchNoTouch: 'TOUCH /NO-TOUCH',
    textEndInEndOut: 'END-IN/END-OUT',
    textStayInBreakOut: 'STAY-IN/BREAK-OUT',
    textJapanPeriodMinute: 'minute',
    textJapanPeriodMinutes: 'minutes',
    textJapanPeriodHour: 'hour',
    textJapanPeriodHours: 'hours',
    textJapanPeriodDay: 'day',
    textJapanPeriodDays: 'days',
    textJapanPeriodWeek: 'week',
    textJapanPeriodWeeks: 'weeks',
    textJapanPeriodMonth: 'month',
    textJapanPeriodMonths: 'months',
    textJapanPeriodYear: 'year',
    textJapanPeriodYears: 'years',
    textBarrier: 'Barrier',
    textSell: 'Sell',
    textBuy: 'Buy',
    textCALLE: '[_1] [_2] payout if [_3] is strictly higher or equal than Exercise price at close  on [_4].',
    textPUT: '[_1] [_2] payout if [_3] is strictly lower than Exercise price at close on [_4].',
    textNOTOUCH: '[_1] [_2] payout if [_3] does not touch Exercise price through close on [_4].',
    textONETOUCH: '[_1] [_2] payout if [_3] touches Exercise price through close on [_4].',
    textEXPIRYRANGEE: '[_1] [_2] payout if [_3] ends on or between low and high values of Exercise price at close on [_4].',
    textEXPIRYMISS: '[_1] [_2] payout if [_3] ends otside low and high values of Exercise price at close on [_4].',
    textRANGE: '[_1] [_2] payout if [_3] stays between low and high values of Exercise price through close on [_4].',
    textUPORDOWN: '[_1] [_2] payout if [_3] goes ouside of low and high values of Exercise price through close on [_4].',
    textCALLEName: 'Higher',
    textPUTName: 'Lower',
    textONETOUCHName: 'Touches',
    textNOTOUCHName: 'Does Not Touch',
    textEXPIRYRANGEEName: 'Ends Between',
    textEXPIRYMISSName: 'Ends Outside',
    textRANGEName: 'Stays Between',
    textUPORDOWNName: 'Goes Outside',  
  },
});

store.dispatch({
  type: 'SET_CONTRACT_TYPES',
  payload: {
    CALLE: { opposite: 'PUT', order: 1 },
    PUT: { opposite: 'CALLE', order: 2 },
    ONETOUCH: { opposite: 'NOTOUCH', order: 1 },
    NOTOUCH: { opposite: 'ONETOUCH', order: 2 },
    EXPIRYRANGEE: { opposite: 'EXPIRYMISS', order: 1 },
    EXPIRYMISS: { opposite: 'EXPIRYRANGEE', order: 2 },
    RANGE: { opposite: 'UPORDOWN', order: 1 },
    UPORDOWN: { opposite: 'RANGE', order: 2 },
  },
});

store.dispatch(Actions.getSymbols());

ReactDOM.render(<Provider store={store}>
    <JapanContainer /></Provider>, document.getElementById('app'));
