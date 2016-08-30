import React from 'react';
import { List, Map } from 'immutable';

import text from '../helpers/text';
import InputBlock from './InputBlock';
import Select from './Select';

const getCategories = (state = Map()) => {
  const categoryNames = {
    higherlower: text('HIGH/LOW'),
    touchnotouch: text('TOUCH /NO-TOUCH'),
    endsinout: text('END-IN/END-OUT'),
    staysinout: text('STAY-IN/BREAK-OUT'),
  };

  return state.getIn(['values', 'categories'], Map())
    .map((name, category) => List.of(category, categoryNames[category]))
    .toList();
};

const CategorySelectContainer = (props) => (<InputBlock
  heading={text('Option Type')}><Select
    {...props}
    options={getCategories(props.state)}
    className='select'/></InputBlock>);

CategorySelectContainer.displayName = 'CategorySelectContainer';
CategorySelectContainer.propTypes = {
  state: React.PropTypes.instanceOf(Map).isRequired,
};

export default CategorySelectContainer;
