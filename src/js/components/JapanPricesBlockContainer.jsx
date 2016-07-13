import React from 'react';
import { Map, List } from 'immutable';

import JapanPriceDetailsContainer from './JapanPriceDetailsContainer';
import JapanPriceContainer from './JapanPriceContainer';
import JapanPricesBlock from './JapanPricesBlock';

const JapanPricesBlockContainer = ({ table, values, text, actions }) => {
  const type = table.get('contractType');
  const details = (<JapanPriceDetailsContainer
    symbol={values.get('symbol', '')}
    period={values.get('period', '')}
    payout={String(values.get('payout', ''))}
    text={text}
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
    barrierLabel={text.get('textBarrier')}
    barriers={barriers}
    buyLabel={text.get('textBuy')}
    buyPrices={buyPrices}
    sellLabel={text.get('textSell')}
    sellPrices={sellPrices} />);
};

JapanPricesBlockContainer.displayName = 'JapanPricesBlockContainer';
JapanPricesBlockContainer.propTypes = {
  values: React.PropTypes.instanceOf(Map).isRequired,
  text: React.PropTypes.instanceOf(Map).isRequired,
  table: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default JapanPricesBlockContainer;
