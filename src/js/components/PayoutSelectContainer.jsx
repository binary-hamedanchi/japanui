import React from 'react';
import { List } from 'immutable';

import Select from './Select';
import config from 'config/config.json';

const getPayouts = () => List(
  config.payouts.map((payout) => List.of(payout, `¥ ${Number(payout).toLocaleString()}`))
);

const PayoutSelectContainer = (props) => (<Select
  {...props}
  options={getPayouts()} />);

PayoutSelectContainer.displayName = 'PayoutSelectContainer';

export default PayoutSelectContainer;
