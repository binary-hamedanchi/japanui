import React from 'react';
import { List } from 'immutable';

const JapanPricesBlock = ({
  barrierLabel,
  barriers,
  buyLabel,
  buyPrices,
  sellLabel,
  sellPrices,
  priceDetails,
}) => (
  <div className='col prices-wrapper flex-box rows'>
  {priceDetails}
  <div className='row flex-box cols'>
    <div className='col flex-box rows barriers'>
      <div className='row heading' key='barriers-label'>{barrierLabel}</div>
      {barriers.map((barrier, key) => <div className='row' key={key}>{barrier}</div>)}
    </div>
    <div className='col flex-box rows buy-prices'>
      <div className='row heading' key='buy-label'>{buyLabel}</div>
      {buyPrices.map((buyPrice, key) => (
        <div className='row' key={key}>{buyPrice}</div>))}
    </div>
    <div className='col flex-box rows sell-prices'>
      <div className='row heading' key='buy-label'>{sellLabel}</div>
      {sellPrices.map((sellPrice, key) => (
        <div className='row' key={key}>{sellPrice}</div>))}
    </div>
  </div>
</div>);

JapanPricesBlock.displayName = 'JapanPricesBlock';
JapanPricesBlock.propTypes = {
  barrierLabel: React.PropTypes.string.isRequired,
  barriers: React.PropTypes.instanceOf(List).isRequired,
  buyLabel: React.PropTypes.string.isRequired,
  buyPrices: React.PropTypes.instanceOf(List).isRequired,
  sellLabel: React.PropTypes.string.isRequired,
  sellPrices: React.PropTypes.instanceOf(List).isRequired,
  priceDetails: React.PropTypes.element.isRequired,
};

export default JapanPricesBlock;
