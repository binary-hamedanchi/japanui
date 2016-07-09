import React from 'react';
import Select from './Select';
import { List } from 'immutable';

const Form = (props) => {
  return (<section className='japan-form'>
    <Select
      className='symbol-select'
      value={props.symbol}
      options={props.symbols}
      onChange={(e) => props.actions.setSymbol({ symbol: e.target.value })} />
    <Select
      className='category-select'
      value={props.category}
      options={props.categories}
      onChange={(e) => props.actions.setCategory({ category: e.target.value })}/>
    <Select
      className='period-select'
      value={props.period}
      options={props.periods}
      onChange={(e) => props.actions.setPeriod({ period: e.target.value })}/>
    <Select
      className='payout-select'
      value={props.payout}
      options={props.payouts}
      onChange={(e) => props.actions.setPayout({ payout: e.target.value })}/>
  </section>);
};

Form.displayName = 'Form';
Form.propTypes = {
  actions: React.PropTypes.object.isRequired,
  symbols: React.PropTypes.instanceOf(List).isRequired,
  categories: React.PropTypes.instanceOf(List).isRequired,
  periods: React.PropTypes.instanceOf(List).isRequired,
  payouts: React.PropTypes.instanceOf(List).isRequired,
  symbol: React.PropTypes.string,
  category: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
};

export default Form;
