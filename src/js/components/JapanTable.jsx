import React from 'react';
import { Map, List } from 'immutable';
import Column from './Column';
import Barriers from './Barriers';

function getTable(proposals = Map(), errors = Map(), payout) {
  const typesList = proposals.concat(errors).reduce((res, val, key) => {
    const params = key.split('_');
    return res.set(params[1], 1);
  }, Map()).keySeq();


  const typesMap = Map({
    [typesList.get(0)]: typesList.get(1),
    [typesList.get(1)]: typesList.get(0),
  });

  const table = proposals.concat(errors).reduce((res, val, key) => {
    const params = key.split('_');
    const barrier = params.length === 5 ? params[3] : `${params[3]}_${params[4]}`;

    let askPrice = payout;
    let inactive = false;
    if (val.getIn(['value', 'ask_price'])) {
      askPrice = val.getIn(['value', 'ask_price']);
      inactive = true;
    }

    return res.setIn([params[1], barrier, 'ask'],
        Map({
          value: Math.round(askPrice),
          inactive,
        }))
      .setIn([typesMap.get(params[1]), barrier, 'bid'],
        Map({
          value: Math.round(payout - askPrice),
          inactive,
        }));
  }, Map());
  return table;
}

const TableContainer = ({ state }) => {
  if (!state.hasIn(['values', 'payout'])) {
    return null;
  }

  if (state.getIn(['streams', 'proposals'], Map()).isEmpty() &&
    state.getIn(['errors', 'proposals'], Map()).isEmpty()) {
    return null;
  }

  const tableMap = getTable(
    state.getIn(['streams', 'proposals']),
    state.getIn(['errors', 'proposals']),
    state.getIn(['values', 'payout']));

  const columns = tableMap.reduce(
    (res, val, key) => res.push(<Barriers
      key={`${key}barriers`}
      table={tableMap}
      title={state.getIn(['texts', 'textBarriers'])}/>)
    .push(<Column
      key={key}
      list={val}
      type={key}
      sell={state.getIn(['texts', 'textSell'])}
      buy={state.getIn(['texts', 'textBuy'])}/>), List()).toArray();

  return <div className='japan-table'>{columns}</div>;
};

TableContainer.displayName = 'TableContainer';
TableContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default TableContainer;
