import { WS_API } from '../middleware/SocketMiddleware';
import SymbolsHelper from '../helpers/SymbolsHelper';
import ContractsHelper from '../helpers/ContractsHelper';

import showBuyWindow from '../patches/showBuyWindow';
import TradingAnalysis from '../patches/TradingAnalysis';

import { Map } from 'immutable';

function authorize() {
  return (dispatch, getState) => {
    if (typeof window.getCookieItem !== 'function') {
      return Promise.resolve();
    }

    const loginToken = window.getCookieItem('login');
    if (getState().has('user') || !loginToken || !localStorage.getItem('client.tokens')) {
      return Promise.resolve();
    }

    return dispatch({
      [WS_API]: {
        types: ['PENDING_USER', 'FAILURE_USER', 'SUCCESS_USER'],
        authorize: loginToken,
      },
    });
  };
}

function getTicks() {
  return (dispatch, getState) => {
    const symbol = getState().getIn(['values', 'symbol']);
    if (!symbol) {
      return Promise.resolve();
    }

    const prevTickChannel = getState().getIn(['streams', 'ticks', 'channel']);
    if (prevTickChannel) {
      prevTickChannel.close();
    }

    return dispatch({
      // skipLog: true,
      symbol,
      [WS_API]: {
        types: ['PENDING_TICK', 'FAILURE_TICK', 'SUCCESS_TICK'],
        ticks: symbol,
        subscribe: 1,
      },
    });
  };
}

export function getSymbols() {
  return (dispatch) => dispatch({
    [WS_API]: {
      types: ['PENDING_SYMBOLS', 'FAILURE_SYMBOLS', 'SUCCESS_SYMBOLS'],
      landing_company: 'japan',
      active_symbols: 'brief',
    },
  }).then(() => dispatch(setSymbol()));
}

export function setSymbol(payload) {
  return (dispatch, getState) => {
    const symbols = getState().get('symbols');
    if (!symbols) {
      return Promise.reject();
    }

    let symbol = payload && payload.symbol;
    const store = Boolean(symbol);

    if (!symbol) {
      symbol = getState().getIn(['storage', 'symbol']);
    }

    if (!symbol) {
      const openedSymbols = SymbolsHelper.getSymbols(symbols, 'major_pairs', { state: true });
      symbol = openedSymbols.first() ? openedSymbols.first().get('symbol') : '';
    }

    if (!symbol) {
      return Promise.reject();
    }

    return dispatch(deleteStreams()).then(() => dispatch({
      type: 'SET_SYMBOL',
      payload: { symbol, store },
    }).then(() => {
      dispatch(getTicks());
      return dispatch(getContracts());
    }));
  };
}

export function getContracts() {
  return (dispatch, getState) => {
    const symbol = getState().getIn(['values', 'symbol']);

    if (!symbol) {
      return Promise.reject();
    }

    return dispatch(deleteStreams()).then(() => dispatch({
      symbol: symbol,
      [WS_API]: {
        types: ['PENDING_CONTRACTS', 'FAILURE_CONTRACTS', 'SUCCESS_CONTRACTS'],
        contracts_for: symbol,
        currency: 'JPY',
        region: 'japan',
      },
    }).then(() => dispatch(setCategory())));
  };
}

export function setCategory(payload) {
  return (dispatch, getState) => {
    let category = payload && payload.category;
    const store = Boolean(category);

    const contracts = getState().getIn(['contracts', 'available']);

    if (!contracts) {
      return Promise.reject();
    }

    if (!category) {
      category = getState().getIn(['storage', 'category']);
    }

    if (!category) {
      const categories = ContractsHelper.getCategories(contracts);
      category = categories.first();
    }

    TradingAnalysis().request();

    return dispatch(deleteStreams()).then(() => dispatch({
      type: 'SET_CATEGORY',
      payload: {
        category,
        store,
      },
    }).then(() => dispatch(setPeriod())));
  };
}

export function setPeriod(payload) {
  return (dispatch, getState) => {
    let period = payload && payload.period;
    const store = Boolean(period);
    const category = getState().getIn(['values', 'category']);
    const contracts = getState().getIn(['contracts', 'available']);

    if (!category || !contracts) {
      return Promise.reject();
    }

    if (!period) {
      const periods = ContractsHelper.getTradingPeriods(contracts, category);
      period = getState().getIn(['storage', 'period']);

      if (!periods.filter((v) => `${v.get('start')}_${v.get('end')}` === period).size) {
        period = `${periods.first().get('start')}_${periods.first().get('end')}`;
      }
    }

    return dispatch(deleteStreams()).then(() => dispatch({
      type: 'SET_PERIOD',
      payload: {
        period,
        store,
      },
    }).then(() => dispatch(setPayout())));
  };
}

export function setPayout(payload) {
  return (dispatch, getState) => {
    let payout = payload && payload.payout;
    const store = Boolean(payout);

    if (!payout) {
      payout = getState().getIn(['storage', 'payout']);
    }

    if (!payout) {
      payout = 1000;
    }

    return dispatch(deleteStreams()).then(() => dispatch({
      type: 'SET_PAYOUT',
      payload: {
        payout,
        store,
      },
    }).then(() => {
      dispatch(getPrices());
    }));
  };
}

export function getPrices() {
  return (dispatch, getState) => {
    const symbol = getState().getIn(['values', 'symbol']);
    const category = getState().getIn(['values', 'category']);
    const period = getState().getIn(['values', 'period']);
    const payout = getState().getIn(['values', 'payout']);
    const contracts = getState().getIn(['contracts', 'available']);

    if (!symbol || !category || !period || !payout || !contracts) {
      return Promise.reject();
    }

    const [startDate, endDate] = period.split('_');

    const barriers = ContractsHelper.getJapanBarriers(contracts, category, startDate, endDate);
    const contractTypes = ContractsHelper.getContractTypes(contracts, category);

    contractTypes.forEach((contractType) => barriers.forEach((barrier) => {
      const request = {
        types: ['PENDING_PROPOSAL', 'FAILURE_PROPOSAL', 'SUCCESS_PROPOSAL'],
        proposal: 1,
        subscribe: 1,
        amount: payout,
        basis: 'payout',
        contract_type: contractType,
        currency: 'JPY',
        symbol: symbol,
        date_expiry: endDate,
      };

      let barrierName;
      if (typeof barrier === 'object') {
        request.barrier = barrier.get(1);
        request.barrier2 = barrier.get(0);
        barrierName = barrier.join('_');
      } else {
        request.barrier = barrier;
        barrierName = barrier;
      }

      const shortCode = [symbol, contractType, endDate, barrierName, payout].join('|');

      dispatch({
        shortCode,
        skipLog: true,
        [WS_API]: request,
      }).catch((err) => console.log(`${shortCode} ${err.message}`));
    }));

    return Promise.resolve();
  };
}

export function buy({ type, price, barriers }) {
  return (dispatch, getState) => {
    const payout = getState().getIn(['values', 'payout']);
    const symbol = getState().getIn(['values', 'symbol']);
    const expiry = getState().getIn(['values', 'period']).split('_')[1];

    const parameters = {
      amount: payout,
      basis: 'payout',
      contract_type: type,
      currency: 'JPY',
      symbol: symbol,
      date_expiry: expiry,
    };

    const match = barriers.match(/^([\d.]+)_([\d.]+)$/);
    if (match) {
      parameters.barrier = match[2];
      parameters.barrier2 = match[1];
    } else {
      parameters.barrier = barriers;
    }

    const shortCode = [symbol, type, expiry, barriers, payout, price].join('|');
    const cleanBuy = () => setTimeout(() => dispatch({ type: 'DELETE_BUY', shortCode }), 60 * 1000);
    dispatch(authorize()).then(() => dispatch({
      shortCode,
      [WS_API]: {
        types: ['PENDING_BUY', 'FAILURE_BUY', 'SUCCESS_BUY'],
        buy: 1,
        price: price,
        parameters,
      },
    }).then((action) => {
      showBuyWindow(action.payload.contract_id);
      cleanBuy();
    }).catch(cleanBuy));
  };
}

export function close() {
  return {
    type: 'CLOSE',
    [WS_API]: {
      close: 1,
    },
  };
}

function deleteStreams() {
  return (dispatch, getState) => {
    const streams = getState().getIn(['streams', 'proposals'], Map())
      .concat(getState().getIn(['errors', 'proposals'], Map()));

    streams.forEach((stream) => {
      const channel = stream.get('channel');
      if (channel) {
        channel.close();
      }
    });

    if (!streams.isEmpty()) {
      return dispatch({
        type: 'DELETE_STREAMS',
      });
    }

    return Promise.resolve();
  };
}
