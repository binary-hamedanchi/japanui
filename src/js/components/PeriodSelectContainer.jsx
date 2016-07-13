import React from 'react';
import { List, Map } from 'immutable';
import moment from 'moment';

import ContractsHelper from '../helpers/ContractsHelper';
import Select from './Select';
import text from '../helpers/text';

const getPeriods = (state = Map()) => {
  const contracts = state.getIn(['contracts', 'available'], List());
  const category = state.getIn(['values', 'category'], '');

  const periods = ContractsHelper.getTradingPeriods(contracts, category);
  return periods.map((period) => {
    const duration = period.get('duration').replace('0d', '1d').replace(/[a-z]+/gi, (dur) => {
      switch (dur) {
        case 'm':
          return text.localize('minutes');
        case 'h':
          return text.localize('hours');
        case 'd':
          return text.localize('days');
        case 'W':
          return text.localize('weeks');
        case 'M':
          return text.localize('months');
        case 'Y':
          return text.localize('years');
        default:
          return void 0;
      }
    });

    const formatDate = moment.utc(period.get('end') * 1000).utcOffset(9)
      .format(`MM[${text.localize('month')}] ` +
        `DD[${text.localize('day')}] HH:mm [(${duration})]`);

    return List.of(`${period.get('start') }_${period.get('end')}`, formatDate);
  });
};

const PeriodSelectContainer = (props) => (<Select
  {...props}
  options={getPeriods(props.state)} />);

PeriodSelectContainer.displayName = 'PeriodSelectContainer';
PeriodSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default PeriodSelectContainer;
