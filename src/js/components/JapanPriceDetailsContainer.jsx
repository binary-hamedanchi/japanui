import React from 'react';
import moment from 'moment';

import JapanPriceDetails from './JapanPriceDetails';
import text from '../helpers/text';
import contractTypes from '../config/contractTypes.json';

const JapanPriceDetailsContainer = ({
  symbol,
  period,
  payout,
  type,
}) => {
  if (!symbol || !period || !payout || !type) {
    return null;
  }

  const endDate = period.split('_')[1];
  const close = moment.utc(endDate * 1000).utcOffset(9)
    .format(`MM[${text('month')}] ` +
      `DD[${text('day')}] HH:mm`);

  const description = text(contractTypes[type].description, [
    '¥',
    Number(payout * 1000).toLocaleString(),
    symbol,
    close,
  ]);

  return (<JapanPriceDetails
    description={description}
    type={type}
    label={text(contractTypes[type].name)}/>);
};

JapanPriceDetailsContainer.displayName = 'JapanPriceDetailsContainer';
JapanPriceDetailsContainer.propTypes = {
  symbol: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default JapanPriceDetailsContainer;
