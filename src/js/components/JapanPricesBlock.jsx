import React from 'react';
import { List } from 'immutable';
import text from '../helpers/text';

const JapanPricesBlock = ({
  barriers,
  buyPrices,
  sellPrices,
  priceDetails,
}) => (
  <div className='prices-wrapper gr-6 gr-12-m gr-12-p'>
  {priceDetails}
  <div className='row flex-box cols'>
    <div className='gr-4 gr-no-gutter barriers'>
      <div className='row heading' key='barriers-label'>{text('Barrier')}</div>
      {barriers.map((barrier, key) => <div className='row' key={key}>{barrier}</div>)}
    </div>
    <div className='gr-4 gr-no-gutter buy-prices'>
      <div className='row heading' key='buy-label'>{text('Buy')}</div>
      {buyPrices.map((buyPrice, key) => (
        <div className='row' key={key}>{buyPrice}</div>))}
    </div>
    <div className='gr-4 gr-no-gutter sell-prices'>
      <div className='row heading' key='buy-label'>{text('Sell')}</div>
      {sellPrices.map((sellPrice, key) => (
        <div className='row' key={key}>{sellPrice}</div>))}
    </div>
  </div>
</div>);

JapanPricesBlock.displayName = 'JapanPricesBlock';
JapanPricesBlock.propTypes = {
  barriers: React.PropTypes.instanceOf(List).isRequired,
  buyPrices: React.PropTypes.instanceOf(List).isRequired,
  sellPrices: React.PropTypes.instanceOf(List).isRequired,
  priceDetails: React.PropTypes.element.isRequired,
};

export default JapanPricesBlock;
