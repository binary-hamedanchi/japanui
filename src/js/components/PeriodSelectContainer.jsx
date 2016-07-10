import React from 'react';
import { List, Map } from 'immutable';
import moment from 'moment';

import ContractsHelper from '../helpers/ContractsHelper';
import Select from './Select';

const getPeriods = (state = Map()) => {
  const contracts = state.getIn(['contracts', 'available'], List());
  const category = state.getIn(['values', 'category'], '');
  const texts = state.get('texts', Map());

  const periods = ContractsHelper.getTradingPeriods(contracts, category);
  return periods.map((period) => {
    const formatDate = moment.utc(period.get('end') * 1000).utcOffset('+0800')
      .format(`MM[${texts.get('textJapanPeriodM')}] ` +
        `DD[${texts.get('textJapanPeriodD')}] HH:mm [(${period.get('duration')})]`);

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
