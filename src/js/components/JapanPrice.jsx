import React from 'react';

const JapanPrice = ({ price, dynamics }) => (
  <span className='price-wrapper'>{price}<span className='dynamics'>{dynamics}</span></span>
);

JapanPrice.displayName = 'JapanPrice';
JapanPrice.propTypes = {
  price: React.PropTypes.string.isRequired,
  dynamics: React.PropTypes.string,
};

export default JapanPrice;
