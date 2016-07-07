import React from 'react';
import Select from './Select';
import { Map } from 'immutable';
import ContractsHelper from '../helpers/ContractsHelper';
import SymbolsHelper from '../helpers/SymbolsHelper';
import moment from 'moment';

function getSymbolsList(symbols) {
  return SymbolsHelper.getSymbols(symbols, 'major_pairs')
    .reduce((res, v) => res.set(v.get('symbol'), v.get('display_name')), Map());
}

function getCategoriesList(contracts, texts) {
  const names = {
    higherlower: texts.get('textHighLow'),
    touchnotouch: texts.get('textTouchNoTouch'),
    endsinout: texts.get('textEndInEndOut'),
    staysinout: texts.get('textStayInBreakOut'),
  };

  const categories = ContractsHelper.getCategories(contracts.get('available'))
    .map((name, key) => names[key]);

  return categories;
}

function getPeriods(contracts, category, texts) {
  const periods = ContractsHelper.getTradingPeriods(contracts.get('available'), category);

  return periods.reduce((res, v) => {
    const start = v.get(0) * 1000;
    const end = v.get(1) * 1000;

    const yearDiff = moment(end).diff(start, 'years');
    const monthDiff = moment(end).diff(start, 'months');
    const weekDiff = moment(end).diff(start, 'weeks');
    const dayDiff = moment(end).diff(start, 'days');
    const hourDiff = moment(end).diff(start, 'hours');

    let diff;
    if (yearDiff) {
      diff = `${yearDiff}${texts.get('textJapanPeriodY')}`;
    } else if (monthDiff) {
      diff = `${monthDiff}${texts.get('textJapanPeriodM')}`;
    } else if (weekDiff) {
      diff = `${weekDiff}${texts.get('textJapanPeriodW')}`;
    } else if (dayDiff) {
      diff = `${dayDiff}${texts.get('textJapanPeriodD')}`;
    } else if (hourDiff) {
      diff = `${hourDiff}${texts.get('textJapanPeriodH')}`;
    }

    if (diff === `23${texts.get('textJapanPeriodH')}`) {
      diff = `1${texts.get('textJapanPeriodD')}`;
    }

    if (diff === `4${texts.get('textJapanPeriodW')}`) {
      diff = `1${texts.get('textJapanPeriodM')}`;
    }

    const formatDate = moment.utc(end).zone('+0800')
      .format(`MM[${texts.get('textJapanPeriodM')}]` +
        ` DD[${texts.get('textJapanPeriodD')}] HH:mm [(${diff})]`);

    const period = v.join('_');
    return res.set(period, formatDate);
  }, Map());
}

function getPayouts(payouts) {
  return payouts.reduce((res, val) => res.set(val, `¥ ${val}`), Map());
}

const FormContainer = ({ state, actions }) => {
  if (!state.has('contracts')) {
    return null;
  }

  if (!state.has('symbols')) {
    return null;
  }

  if (!state.hasIn(['values', 'symbol'])) {
    return null;
  }

  if (!state.hasIn(['values', 'category'])) {
    return null;
  }

  if (!state.hasIn(['values', 'period'])) {
    return null;
  }

  if (!state.hasIn(['values', 'payout'])) {
    return null;
  }

  return (<section className='japan-form'>
    <Select
      value={state.getIn(['values', 'symbol'])}
      options={getSymbolsList(state.get('symbols'))}
      className='symbol-select'
      onChange={(e) => actions.setSymbol({ symbol: e.target.value })} />
    <Select
      value={state.getIn(['values', 'category'])}
      options={getCategoriesList(state.get('contracts'), state.get('texts'))}
      className='category-select'
      onChange={(e) => actions.setCategory({ category: e.target.value })}/>
    <Select
      value={state.getIn(['values', 'period'])}
      options={getPeriods(state.get('contracts'),
        state.getIn(['values', 'category']),
        state.get('texts'))}
      className='period-select'
      onChange={(e) => actions.setPeriod({ period: e.target.value })}/>
    <Select
      value={state.getIn(['values', 'payout'])}
      options={getPayouts(state.get('payouts'))}
      className='payout-select'
      onChange={(e) => actions.setPayout({ payout: e.target.value })}/>
  </section>);
};

FormContainer.displayName = 'FormContainer';
FormContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default FormContainer;
