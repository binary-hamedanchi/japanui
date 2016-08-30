import React from 'react';

const InputBlock = (props) => (<div className='select-box'>
  <div className='select-heading'>{props.heading}</div>
  {props.children}
</div>);

InputBlock.displayName = 'InputBlock';
InputBlock.propTypes = {
  heading: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default InputBlock;
