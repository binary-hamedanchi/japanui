import React from 'react';

const InputBlock = (props) => (<div className='gr-6 gr-no-gutter-left'>
    <div className='select-box'>
        <div className='padding-10'>
            <div className='select-heading'>{props.heading}</div>
            {props.children}
        </div>
    </div>
</div>);

InputBlock.displayName = 'InputBlock';
InputBlock.propTypes = {
  heading: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default InputBlock;
