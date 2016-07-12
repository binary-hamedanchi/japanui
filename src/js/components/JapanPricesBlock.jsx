import React from 'react';
import { List } from 'immutable';
import classNames from 'classnames';

const JapanPricesBlock = ({
  barrierLabel,
  barriers,
  buyLabel,
  buyPrices,
  sellLabel,
  sellPrices,
  priceDetails,
}) => (
  <div className='col prices-wrapper flex-box'>
  <div className='row'>{priceDetails}</div>
  <div className='row flex-box'>
    <div className='col flex-box barriers'>
      <div className='row heading' key='barriers-label'>{barrierLabel}</div>
      {barriers.map((barrier, key) => <div className='row' key={key}>{barrier}</div>)}
    </div>
    <div className='col flex-box buy-prices'>
      <div className='row heading' key='buy-label'>{buyLabel}</div>
      {buyPrices.map((buyPrice, key) => (
        <div className={classNames('row', buyPrice.get('classes'))}
          key={key}>{buyPrice.get('val')}</div>))}
    </div>
    <div className='col flex-box sell-prices'>
      <div className='row heading' key='buy-label'>{sellLabel}</div>
      {sellPrices.map((sellPrice, key) => (
        <div className={classNames('row', sellPrice.get('classes'))}
          key={key}>{sellPrice.get('val')}</div>))}
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
