import React from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';

import JapanTableRow from './JapanTableRow';

const JapanTableRowContainer = ({ price, isHeading, buyCb, type }) => {
  const buyClasses = {};
  const sellClasses = {};

  let buy;
  let sell;

  if (!isHeading) {
    buyClasses.inactive = !price.getIn(['ask', 'isActive']);
    buyClasses.up = price.getIn(['ask', 'dynamics']) > 0;
    buyClasses.down = price.getIn(['ask', 'dynamics']) < 0;

    sellClasses.inactive = !price.getIn(['bid', 'isActive']);
    sellClasses.up = price.getIn(['bid', 'dynamics']) > 0;
    sellClasses.down = price.getIn(['bid', 'dynamics']) < 0;

    const buyCB = () => buyCb({ barriers: barrier, type, price: price.getIn(['ask', 'val']) });

    buy = price.hasIn(['ask', 'val']) ?
      <button onClick={buyCB}>{`¥${price.getIn(['ask', 'val'])}`}</button> : null;
    sell = price.hasIn(['bid', 'val']) ? `¥${price.getIn(['bid', 'val'])}` : null;
  } else {
    buy = price.get('buy');
    sell = price.get('sell');
  }

  const barrier = price.get('barrier').replace('_', ' ... ');

  return (<JapanTableRow
    barrier={barrier}
    buy={buy}
    buyClasses={classNames(buyClasses)}
    sell={sell}
    sellClasses={classNames(sellClasses)}
    isHeading={isHeading} />);
};

JapanTableRowContainer.displayName = 'JapanTableRowContainer';
JapanTableRowContainer.propTypes = {
  type: React.PropTypes.string,
  buyCb: React.PropTypes.func,
  price: React.PropTypes.instanceOf(Map).isRequired,
  isHeading: React.PropTypes.bool,
};

export default JapanTableRowContainer;
