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
  const pattern = text.localize(contractTypes[type].description);
  if (!symbol || !period || !payout || !type || !pattern) {
    return null;
  }

  const endDate = period.split('_')[1];
  const close = moment.utc(endDate * 1000).utcOffset(9)
    .format(`MM[${text.localize('month')}] ` +
      `DD[${text.localize('day')}] HH:mm`);

  const description = pattern.replace(/\[\_\d+\]/g, (r) => {
    switch (r) {
      case '[_1]':
        return '¥';
      case '[_2]':
        return Number(payout).toLocaleString();
      case '[_3]':
        return symbol;
      case '[_4]':
        return close;
      default:
        return void 0;
    }
  });

  return (<JapanPriceDetails
    description={description}
    type={type}
    label={text.localize(contractTypes[type].name)}/>);
};

JapanPriceDetailsContainer.displayName = 'JapanPriceDetailsContainer';
JapanPriceDetailsContainer.propTypes = {
  symbol: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default JapanPriceDetailsContainer;
