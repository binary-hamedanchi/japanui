import React from 'react';
import { Map, List } from 'immutable';
import classNames from 'classnames';

import JapanPriceDetailsContainer from './JapanPriceDetailsContainer';
import JapanPricesBlock from './JapanPricesBlock';


const getClasses = (price) => classNames({
  inactive: !price.get('isActive'),
  up: price.get('dynamics') > 0,
  down: price.get('dynamics') < 0,
});

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
    const barrier = price.get('barrier');
    const buy = price.getIn(['ask', 'val']);
    const sell = price.getIn(['bid', 'val']);

    const barrierBlock = barrier.replace('_', ' ... ');
    const cb = () => actions.buy({ barriers: barrier, price: buy, type });
    const buyBlock = typeof buy !== 'undefined' ? <button onClick={cb}>{`¥${buy}`}</button> : null;
    const sellBlock = typeof sell !== 'undefined' ? String(sell) : null;

    barriers = barriers.push(barrierBlock);
    buyPrices = buyPrices.push(Map({
      val: buyBlock,
      classes: getClasses(price.get('ask')),
    }));
    sellPrices = sellPrices.push(Map({
      val: sellBlock,
      classes: getClasses(price.get('bid')),
    }));
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
