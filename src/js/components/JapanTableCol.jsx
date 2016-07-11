import React from 'react';
import { Map, List } from 'immutable';

import JapanPriceDetailsContainer from './JapanPriceDetailsContainer';
import JapanTableRowContainer from './JapanTableRowContainer';

const JapanTableCol = ({
  prices,
  symbol,
  period,
  payout,
  type,
  text,
}) => (<div className='col'>
  <JapanPriceDetailsContainer
    key='description'
    text={text}
    type={type}
    symbol={symbol}
    period={period}
    payout={payout} />
  <JapanTableRowContainer
    key='heading'
    isHeading
    price={Map({
      barrier: text.get('textBarrier'),
      buy: text.get('textBuy'),
      sell: text.get('textSell'),
    })} />
  {prices.map((price, key) => (
    <JapanTableRowContainer
      key={key}
      price={price} />
  ))}
</div>);

JapanTableCol.displayName = 'JapanTableCol';
JapanTableCol.propTypes = {
  prices: React.PropTypes.instanceOf(List).isRequired,
  type: React.PropTypes.string.isRequired,
  text: React.PropTypes.instanceOf(Map).isRequired,
  symbol: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
};

export default JapanTableCol;
