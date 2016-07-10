import React from 'react';
import { List, Map } from 'immutable';

import ContractsHelper from '../helpers/ContractsHelper';
import Select from './Select';

const getCategories = (state = Map()) => {
  const contracts = state.getIn(['contracts', 'available'], List());
  const texts = state.get('texts', Map());

  const categoryNames = {
    higherlower: texts.get('textHighLow'),
    touchnotouch: texts.get('textTouchNoTouch'),
    endsinout: texts.get('textEndInEndOut'),
    staysinout: texts.get('textStayInBreakOut'),
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
