import React from 'react';
import { Map, List } from 'immutable';

import JapanPriceDetails from './JapanPriceDetails';
import JapanTableRowContainer from './JapanTableRowContainer';

const JapanTableCol = ({ prices, type, text }) => (<div className='col'>
  <JapanPriceDetails
    key='description'
    text={text}
    type={type} />
  <JapanTableRowContainer
    key='heading'
    isHeading
    price={Map({
      barrier: text.get('textBarriers'),
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
};

export default JapanTableCol;
