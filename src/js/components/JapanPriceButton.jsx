import React from 'react';

const JapanPriceButton = ({ price, cb, dynamics }) => (
  <button onClick={cb} className='price-button'>
    {price}<span className='dynamics'>{dynamics}</span>
  </button>
);

JapanPriceButton.displayName = 'JapanPriceButton';
JapanPriceButton.propTypes = {
  price: React.PropTypes.string.isRequired,
  cb: React.PropTypes.func.isRequired,
  dynamics: React.PropTypes.string,
};

export default JapanPriceButton;
