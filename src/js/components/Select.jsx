import React from 'react';
import { List } from 'immutable';

const Select = (props) => {
  const { options } = props;
  const menuItems = options.map((option, key) =>
    (<option value={option.first()} key={key}>{option.last()}</option>)).toArray();

  return <select {...props}>{menuItems}></select>;
};

Select.displayName = 'Select';
Select.propTypes = {
  options: React.PropTypes.instanceOf(List).isRequired,
  value: React.PropTypes.string,
};

export default Select;
