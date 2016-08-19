import React from 'react';
import { List } from 'immutable';

import SelectBlock from './SelectBlock';
import config from 'config/config.json';
import text from '../helpers/text';

const getPayouts = () => List(
  config.payouts.map((payout) => List.of(payout, `¥ ${Number(payout).toLocaleString()}`))
);

const PayoutSelectContainer = (props) => (<SelectBlock
  {...props}
  heading={text('Payout Amount ')}
  options={getPayouts()} />);

PayoutSelectContainer.displayName = 'PayoutSelectContainer';

export default PayoutSelectContainer;
