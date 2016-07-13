import React from 'react';
import moment from 'moment';
import { Map } from 'immutable';

import JapanPriceDetails from './JapanPriceDetails';

const JapanPriceDetailsContainer = ({
  symbol,
  period,
  payout,
  type,
  text,
}) => {
  const pattern = text.get(`text${type}`);
  if (!symbol || !period || !payout || !type || !pattern) {
    return null;
  }

  const endDate = period.split('_')[1];
  const close = moment.utc(endDate * 1000).utcOffset(9)
    .format(`MM[${text.get('textJapanPeriodMonth')}] ` +
      `DD[${text.get('textJapanPeriodDay')}] HH:mm`);

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
    label={text.get(`text${type}Name`)}/>);
};

JapanPriceDetailsContainer.displayName = 'JapanPriceDetailsContainer';
JapanPriceDetailsContainer.propTypes = {
  text: React.PropTypes.instanceOf(Map).isRequired,
  symbol: React.PropTypes.string,
  period: React.PropTypes.string,
  payout: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default JapanPriceDetailsContainer;
