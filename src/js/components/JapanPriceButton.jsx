import React from 'react';
import classNames from 'classnames';

const JapanPriceButton = ({ price, cb, dynamics, inactive }) => (
  <button onClick={cb} className={classNames('price-button', { inactive: inactive })}>
    {price}<span className='dynamics'>{dynamics}</span>
  </button>
);

JapanPriceButton.displayName = 'JapanPriceButton';
JapanPriceButton.propTypes = {
  price: React.PropTypes.string.isRequired,
  cb: React.PropTypes.func.isRequired,
  dynamics: React.PropTypes.string,
  inactive: React.PropTypes.bool,
};

export default JapanPriceButton;
