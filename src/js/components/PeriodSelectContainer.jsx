import React from 'react';
import { List, Map } from 'immutable';
import moment from 'moment';

import SelectBlock from './SelectBlock';
import text from '../helpers/text';

const getPeriods = (state = Map()) => {
  return state.getIn(['values', 'periods'], List()).map((period) => {
    const duration = period.get('duration').replace('0d', '1d').replace(/[a-z]+/gi, (dur) => {
      switch (dur) {
        case 'm':
          return text('minutes');
        case 'h':
          return text('hours');
        case 'd':
          return text('days');
        case 'W':
          return text('weeks');
        case 'M':
          return text('months');
        case 'Y':
          return text('years');
        default:
          return void 0;
      }
    });

    let formatDate = moment.utc(period.get('end') * 1000).utcOffset(9)
      .format(`MM[${text('month')}] ` +
        `DD[${text('day')}] HH:mm [(${duration})]`);

    formatDate = formatDate.replace(/08:59/, '09:00«');

    return List.of(`${period.get('start') }_${period.get('end')}`, formatDate);
  });
};

const PeriodSelectContainer = (props) => (<SelectBlock
  {...props}
  heading={text('Trading Period')}
  options={getPeriods(props.state)} />);

PeriodSelectContainer.displayName = 'PeriodSelectContainer';
PeriodSelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default PeriodSelectContainer;
