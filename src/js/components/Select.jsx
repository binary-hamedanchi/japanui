import React from 'react';
import { List } from 'immutable';

const Select = (props) => {
  const { options } = props;
  const menuItems = options.map((option, key) =>
    (<option value={option.first()} key={key}>{option.last()}</option>)).toArray();

  const props2 = Object.keys(props)
    .filter((key) => key !== 'state' && key !== 'options')
    .reduce((props2, key) => (props2[key] = props[key], props2), {});

  return <select {...props2}>{menuItems}></select>;
};

Select.displayName = 'Select';
Select.propTypes = {
  options: React.PropTypes.instanceOf(List).isRequired,
  value: React.PropTypes.string,
};

export default Select;
