import React from 'react';
import { Map, List } from 'immutable';

import JapanPriceDetailsContainer from './JapanPriceDetailsContainer';
import JapanPriceContainer from './JapanPriceContainer';
import JapanPricesBlock from './JapanPricesBlock';

const JapanPricesBlockContainer = ({ table, values, actions }) => {
  const type = table.get('contractType');
  const details = (<JapanPriceDetailsContainer
    symbol={values.get('display_name', '')}
    period={values.get('period', '')}
    payout={String(values.get('payout', '') || 1)}
    type={type} />);

  let rows = [];

  table.get('prices', List()).forEach((price) => {
    const cb = () => actions.buy({
      barriers: price.get('barrier'),
      price: price.getIn(['ask', 'val']),
      type,
    });

    rows.push({
      barrier: price.get('barrier').replace('_', ' ... '),
      buyPrice: <JapanPriceContainer
        price={price.get('ask')}
        cb={cb}
        isActive={Boolean(price.getIn(['ask', 'isActive']))}
        message={price.getIn(['ask', 'message'])} />,
      sellPrice: <JapanPriceContainer
        price={price.get('bid')}
        isActive={Boolean(price.getIn(['bid', 'isActive']))}
        message={price.getIn(['bid', 'message'])} />,
    });
  });

  return (<JapanPricesBlock
    priceDetails={details}
    rows={rows} />);
};

JapanPricesBlockContainer.displayName = 'JapanPricesBlockContainer';
JapanPricesBlockContainer.propTypes = {
  values: React.PropTypes.instanceOf(Map).isRequired,
  table: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default JapanPricesBlockContainer;
