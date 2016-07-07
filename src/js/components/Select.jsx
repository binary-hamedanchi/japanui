import React from 'react';
import { List, Map } from 'immutable';

const Select = (props) => {
  const { options } = props;

  let finalOptions = options;
  if (List.isList(options)) {
    finalOptions = options.reduce((res, val) => res.set(val, val), Map());
  }

  const menuItems = finalOptions.map((v, k) => <option value={k} key={k}>{v}</option>).toArray();

  return <select {...props}>{menuItems}></select>;
};


Select.displayName = 'Select';
Select.propTypes = {
  options: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Map).isRequired,
    React.PropTypes.instanceOf(List).isRequired,
  ]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.number.isRequired,
  ]),
};

export default Select;
