import React from 'react';
import { List, Map } from 'immutable';

import ContractsHelper from '../helpers/ContractsHelper';
import text from '../helpers/text';
import Select from './Select';

const getCategories = (state = Map()) => {
  const contracts = state.getIn(['contracts', 'available'], List());

  const categoryNames = {
    higherlower: text.localize('HIGH/LOW'),
    touchnotouch: text.localize('TOUCH /NO-TOUCH'),
    endsinout: text.localize('END-IN/END-OUT'),
    staysinout: text.localize('STAY-IN/BREAK-OUT'),
  };

  return ContractsHelper.getCategories(contracts)
    .map((name, category) => List.of(category, categoryNames[category]))
    .toList();
};

const CategorySelectContainer = (props) => (<Select
  {...props}
  options={getCategories(props.state)} />);

CategorySelectContainer.displayName = 'CategorySelectContainer';
CategorySelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default CategorySelectContainer;
