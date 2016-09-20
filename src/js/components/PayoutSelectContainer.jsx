import React from 'react';
import InputBlock from './InputBlock';
import text from '../helpers/text';

const PayoutSelectContainer = (props) => {

  const props2 = Object.keys(props)
    .filter((key) => key !== 'state' && key !== 'options')
    .reduce((props2, key) => (props2[key] = props[key], props2), {});

  return (<InputBlock
    heading={text('Payout Amount')}
    tooltip={text('min 1,000 and max 100,000')}>
      <div className='payout-input'>
      ¥ <input {...props2} id='payout'/>
        <label className='payout-mult' htmlFor='payout'>,000</label>
      </div>
    </InputBlock>);
}
PayoutSelectContainer.displayName = 'PayoutSelectContainer';

export default PayoutSelectContainer;
