import React from 'react';
import { List } from 'immutable';
import text from '../helpers/text';

const JapanPricesBlock = ({
  priceDetails,
  rows,
}) => {
  return (<div className='prices-wrapper gr-6 gr-12-m gr-12-p gr-no-gutter-left'>
    {priceDetails}
    <div className='gr-12'>
      <div className='gr-row heading'>
        <div className='gr-4 barriers' key='barrier-label'>{text('Barrier')}</div>
        <div className='gr-4 buy-prices' key='buy-label'>{text('Buy')}</div>
        <div className='gr-4 sell-prices' key='sell-label'>{text('Sell')}</div>
      </div>
      {rows.map((row, key) => {
        return (<div className='gr-row price-row' key={'row_' + key}>
          <div className='gr-4 barriers' key={'barrier_' + key}>{row.barrier}</div>
          <div className='gr-4 buy-prices' key={'buy_' + key}>{row.buyPrice}</div>
          <div className='gr-4 sell-prices' key={'sell_' + key}>{row.sellPrice}</div>
        </div>);
      })}
    </div>
  </div>);
};

JapanPricesBlock.displayName = 'JapanPricesBlock';
JapanPricesBlock.propTypes = {
  rows: React.PropTypes.instanceOf(Array).isRequired,
  priceDetails: React.PropTypes.element.isRequired,
};

export default JapanPricesBlock;
