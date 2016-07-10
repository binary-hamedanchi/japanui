import React from 'react';
import { Map } from 'immutable';

import SymbolSelectContainer from './SymbolSelectContainer';
import CategorySelectContainer from './CategorySelectContainer';
import PeriodSelectContainer from './PeriodSelectContainer';
import PayoutSelectContainer from './PayoutSelectContainer';

const JapanFrom = ({ state, actions }) => (<section className='japan-form'>
  <SymbolSelectContainer
    state={state}
    className='symbol-select'
    value={state.getIn(['values', 'symbol'])}
    onChange={(e) => actions.setSymbol({ symbol: e.target.value })} />
  <CategorySelectContainer
    state={state}
    className='category-select'
    value={state.getIn(['values', 'category'])}
    onChange={(e) => actions.setCategory({ category: e.target.value })}/>
  <PeriodSelectContainer
    state={state}
    className='period-select'
    value={state.getIn(['values', 'period'])}
    onChange={(e) => actions.setPeriod({ period: e.target.value })}/>
  <PayoutSelectContainer
    state={state}
    className='payout-select'
    value={state.getIn(['values', 'payout'])}
    onChange={(e) => actions.setPayout({ payout: e.target.value })}/>
</section>);

JapanFrom.displayName = 'JapanFrom';
JapanFrom.propTypes = {
  actions: React.PropTypes.object.isRequired,
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default JapanFrom;
