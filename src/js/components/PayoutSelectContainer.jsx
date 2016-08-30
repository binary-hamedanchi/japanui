import React from 'react';
import InputBlock from './InputBlock';
import text from '../helpers/text';

const PayoutSelectContainer = (props) => (<InputBlock
  heading={text('Payout Amount ')}>
    <div className='payout-input'>
    ¥ <input  {...props} id='payout'/>
      <label className='payout-mult' htmlFor='payout'>,000</label>
    </div>
  </InputBlock>);

PayoutSelectContainer.displayName = 'PayoutSelectContainer';

export default PayoutSelectContainer;
