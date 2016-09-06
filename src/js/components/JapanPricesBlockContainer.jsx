import React from 'react';
import { Map, List } from 'immutable';

import JapanPriceDetailsContainer from './JapanPriceDetailsContainer';
import JapanPriceContainer from './JapanPriceContainer';
import JapanPricesBlock from './JapanPricesBlock';

const JapanPricesBlockContainer = ({ table, values, actions }) => {
  const type = table.get('contractType');
  const details = (<JapanPriceDetailsContainer
    symbol={values.get('symbol', '')}
    period={values.get('period', '')}
    payout={String(values.get('payout', '') || 1)}
    type={type}/>);

  let barriers = List();
  let buyPrices = List();
  let sellPrices = List();

  table.get('prices', List()).forEach((price) => {
    const cb = () => actions.buy({
      barriers: price.get('barrier'),
      price: price.getIn(['ask', 'val']),
      type,
    });

    barriers = barriers.push(price.get('barrier').replace('_', ' ... '));
    buyPrices = buyPrices.push(<JapanPriceContainer
      price={price.get('ask')}
      cb={cb}
      isActive={Boolean(price.getIn(['ask', 'isActive']))} />);
    sellPrices = sellPrices.push(<JapanPriceContainer
      price={price.get('bid')}
      isActive={Boolean(price.getIn(['bid', 'isActive']))} />);
  });

  return (<JapanPricesBlock
    priceDetails={details}
    barriers={barriers}
    buyPrices={buyPrices}
    sellPrices={sellPrices} />);
};

JapanPricesBlockContainer.displayName = 'JapanPricesBlockContainer';
JapanPricesBlockContainer.propTypes = {
  values: React.PropTypes.instanceOf(Map).isRequired,
  table: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default JapanPricesBlockContainer;
