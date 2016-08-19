import React from 'react';
import Select from './Select';
import { List } from 'immutable';

const SelectBlock = (props) => (<div className='select-box'>
  <div className='select-heading'>{props.heading}</div>
  <Select {...props}/>
</div>);

SelectBlock.displayName = 'SelectBlock';
SelectBlock.propTypes = {
  options: React.PropTypes.instanceOf(List).isRequired,
  value: React.PropTypes.string,
  heading: React.PropTypes.string,
};

export default SelectBlock;
