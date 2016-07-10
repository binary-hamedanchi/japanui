import React from 'react';
import { List, Map } from 'immutable';

import JapanTable from './JapanTable';

const getTable = (() => {
  let table = Map();

  return (state = Map()) => {
    const proposals = state.getIn(['streams', 'proposals'], Map());
    const errors = state.getIn(['errors', 'proposals'], Map());
    const payout = state.getIn(['values', 'payout']);
    const contractTypes = state.get('contractTypes', Map());

    table = proposals.concat(errors)
      .reduce((nextTable, proposal, shortCode) => {
        const params = shortCode.split('|');
        const barrier = params[3];
        const contractType = params[1];

        const isActive = Boolean(proposal.getIn(['value', 'ask_price']));
        const askPrice = Math.round(proposal.getIn(['value', 'ask_price'])) || payout;
        const oppositeBidPrice = payout - askPrice;

        const prev = table.getIn([contractType, barrier, 'ask'], Map());
        const time = proposal.getIn(['value', 'time']) || proposal.get('time');

        let dynamics = prev.get('dynamics', 0);
        if (prev.get('time', time) !== time) {
          if (prev.get('val') < askPrice) {
            dynamics = 1;
          } else if (prev.get('val') > askPrice) {
            dynamics = -1;
          } else {
            dynamics = 0;
          }
        }

        const ask = Map({ val: askPrice, dynamics, time, isActive });
        const oppositeBid = Map({ val: oppositeBidPrice, dynamics: -dynamics, time, isActive });

        return nextTable
          .setIn([contractType, barrier, 'ask'], ask)
          .setIn([contractTypes.getIn([contractType, 'opposite']), barrier, 'bid'], oppositeBid);
      }, Map());

    return table
      .reduce((tableList, value, contractType) => tableList.push(Map({
        prices: value
          .reduce((prices, price, barrier) => prices
            .push(price.set('barrier', barrier)
              .deleteIn(['ask', 'time'])
              .deleteIn(['ask', 'time'])), List())
          .sort((item1, item2) => item1.get('barrier') > item2.get('barrier') ? -1 : 1),
        contractType,
      })), List())
      .sort((type1, type2) => contractTypes.getIn([type1.get('contractType'), 'order']) -
        contractTypes.getIn([type2.get('contractType'), 'order']));
  };
})();

const JapanTableContainer = ({ state }) => (<JapanTable
  table={getTable(state)}
  symbol={state.getIn(['values', 'symbol'])}
  period={state.getIn(['values', 'period'])}
  payout={state.getIn(['values', 'payout'])}
  text={state.get('texts')} />);

JapanTableContainer.displayName = 'JapanTableContainer';
JapanTableContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map),
};

export default JapanTableContainer;
