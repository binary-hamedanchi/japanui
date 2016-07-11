import React from 'react';
import { List, Map } from 'immutable';

import Select from './Select';

const getPayouts = (state = Map()) => {
  const payouts = state.get('payouts', List());
  return payouts.map((payout) => List.of(payout, `¥ ${payout}`));
};

const PayoutSelectContainer = (props) => (<Select
  {...props}
  options={getPayouts(props.state)} />);

PayoutSelectContainer.displayName = 'PayoutSelectContainer';
PayoutSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default PayoutSelectContainer;
